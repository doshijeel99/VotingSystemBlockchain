// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Voting {
    // Create a structure template for each of the candidates
    struct candidate {
        uint256 id;
        string name;
        uint256 numberofVotes;
    }
    // list of all candidates
    candidate[] public candidates;
    // This iwll be the owners address
    address public owner;
    //Map all voters adresses
    mapping(address => bool) public voters;
    address[] public listofVoters;

    // Creating voting start and end session
    uint256 public votingStart;
    uint256 public votingEnd;

    // create an election status
    bool public electionStarted;

    // Restrict creating election to the owner
    modifier onlyOwner(){
        require(msg.sender == owner, "You are not authorized to start an election");
        _;
    }
    // check if election is ongoing
    modifier electionOngoing(){
        require(electionStarted,"No election yet");
        _;
    }
    // create a constructor
    constructor(){
        owner = msg.sender;
    }

    // to start an election
    function startElection(string[] memory _candidates, uint256 _votingDuration) public onlyOwner{
        require(electionStarted == false, "Election is currently ongoing");
        delete candidates;
        resetAllVoterStatus();
        for(uint256 i = 0; i < _candidates.length; i++){
            candidates.push(candidate({id: i, name: _candidates[i], numberofVotes: 0}));
        }
        electionStarted = true;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_votingDuration * 1 minutes);
    }


    // to add new category
    function addCandidate(string memory _name) public onlyOwner electionOngoing{
        require(checkElectionPeriod(),"Election period has ended");
        candidates.push(candidate({id: candidates.length, name: _name, numberofVotes: 0}));
    }

    // check voter status
    function voterStatus(address _voter) public view electionOngoing returns (bool) {
    return voters[_voter];
}

event Voted(address indexed voter, uint256 candidateId);

function voteTo(uint256 _id) public electionOngoing {
    require(checkElectionPeriod(), "Election period has ended");
    

    require(candidates[_id].id == _id, "Invalid candidate ID");
    
    candidates[_id].numberofVotes += 1;
    voters[msg.sender] = true;
    listofVoters.push(msg.sender);

    emit Voted(msg.sender, _id);
}


    // get number of votes
    function retrieveVotes() public view returns(candidate[] memory){
        return candidates;
    }

    // monitor election period
    function electionTimer() public view electionOngoing returns(uint256){
        if(block.timestamp >= votingEnd){
            return 0;
        }
        return votingEnd - block.timestamp;
    }

    // check if election period is still ongoing
    function checkElectionPeriod() public returns (bool) {
    if (electionTimer() > 0) {
        return true;
    } else {
        electionStarted = false;
        return false;
    }
}


    // reset all voter status
    function resetAllVoterStatus() public onlyOwner{
        for(uint256 i = 0; i < listofVoters.length; i++){
            voters[listofVoters[i]] = false;
        }
        delete listofVoters;
    }
}
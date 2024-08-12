document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const connectWalletMsg = document.querySelector('#connectWalletMessage');
  const connectWalletBtn = document.querySelector('#connectWallet');
  const votingStation = document.querySelector('#votingStation');
  const timerTime = document.querySelector('#time');
  const timerMessage = document.querySelector('#timerMessage');
  const mainBoard = document.querySelector("#mainBoard");
  const candidateBoard = document.querySelector("#candidateBoard");
  const voteForm = document.querySelector('#voteForm');
  const voteInput = document.querySelector('#vote');
  const voteBtn = document.querySelector('#sendVote');
  const showResultContainer = document.querySelector('#showResultContainer');
  const showResultBtn = document.querySelector('#showResult');
  const resultDiv = document.querySelector('#result');
  const resultBoard = document.querySelector('#resultBoard');
  const adminSection = document.querySelector('#admin');
  const candidatesInput = document.querySelector('#candidatesList');
  const electionDurationInput = document.querySelector('#electionDuration');
  const startElectionBtn = document.querySelector('#startElection');
  const candidateNameInput = document.querySelector('#candidateName');
  const addCandidateBtn = document.querySelector('#addCandidatebtn');

  // Contract Configuration
  const contractAddress = "0xE9034951dC45788B339a27993fd2499BdabF8A90";
  const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "candidateId",
          "type": "uint256"
        }
      ],
      "name": "Voted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "numberofVotes",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "checkElectionPeriod",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "electionStarted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "electionTimer",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "listofVoters",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "resetAllVoterStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "retrieveVotes",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "numberofVotes",
              "type": "uint256"
            }
          ],
          "internalType": "struct Voting.candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "_candidates",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "_votingDuration",
          "type": "uint256"
        }
      ],
      "name": "startElection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "voteTo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "voterStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingEnd",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingStart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  
  ];

  let contract;
  let signer;
  let provider;
  let isOwner = false;
  let registeredCandidates = [];

  async function connectWallet() {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum, 80002);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractABI, signer);
      
      const address = await signer.getAddress();
      connectWalletBtn.textContent = `${address.slice(0, 6)}...${address.slice(-4)}`;
      connectWalletMsg.textContent = "Connected";
      connectWalletBtn.disabled = true;
  
      await checkOwnership();
      if (isOwner) {
        adminSection.style.display = "block";
      } else {
        adminSection.style.display = "none";
      }
  
      votingStation.style.display = "block";
      await checkElectionStatus();
      setInterval(checkElectionStatus, 30000);
  
      // Add event listener for "Voted" event
      contract.on("Voted", (voter, candidateId) => {
        console.log(`Vote recorded: ${voter} voted for candidate ${candidateId}`);
        // You might want to update the UI or notify the user here
      });
  
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    }
  }
  

  async function checkOwnership() {
    try {
      const ownerAddress = await contract.owner();
      const currentAddress = await signer.getAddress();
      isOwner = ownerAddress.toLowerCase() === currentAddress.toLowerCase();
      console.log("Is owner:", isOwner);
    } catch (error) {
      console.error("Error checking ownership:", error);
    }
  }

  async function checkElectionStatus() {
    try {
      const isElectionActive = await contract.electionStarted();
      console.log("Election active:", isElectionActive);
      if (!isElectionActive) {
        console.log("No active election.");
        voteForm.style.display = 'none';
        showResultContainer.style.display = 'none';
        timerMessage.textContent = "No active election";
        registeredCandidates = JSON.parse(localStorage.getItem('registeredCandidates')) || [];
      } else {
        voteForm.style.display = 'block';
        showResultContainer.style.display = 'block';
        updateElectionTimer();
        await getAllCandidates();
      }
      displayCandidates(registeredCandidates);
    } catch (error) {
      console.error("Error checking election status:", error);
    }
  }

  async function updateElectionTimer() {
    try {
        const timeLeft = await contract.electionTimer();
        console.log("Time left:", timeLeft);
        timerTime.textContent = `Time left: ${Math.floor(timeLeft / 60)}:${timeLeft % 60}`;

        const isElectionActive = await contract.checkElectionPeriod();
        console.log("Is election active:", isElectionActive);

        if (isElectionActive) {
            if (timeLeft > 0) {
                timerMessage.textContent = "Election is active";
                voteForm.style.display = 'block';
                showResultContainer.style.display = 'block';
            } else {
                timerMessage.textContent = "Election has ended";
                voteForm.style.display = 'none';
                showResultContainer.style.display = 'block';
            }
        } else {
            timerMessage.textContent = "No active election";
            voteForm.style.display = 'none';
            showResultContainer.style.display = 'none';
        }
    } catch (error) {
        console.error("Error updating timer:", error);
    }
}



async function getAllCandidates() {
  try {
    const candidates = await contract.retrieveVotes();
    console.log("Retrieved candidates:", candidates);
    registeredCandidates = candidates.map(c => ({
      id: ethers.BigNumber.from(c.id).toNumber(), // Convert BigNumber to number
      name: c.name,
      numberofVotes: ethers.BigNumber.from(c.numberofVotes).toNumber() // Convert BigNumber to number
    }));
    localStorage.setItem('registeredCandidates', JSON.stringify(registeredCandidates));
    displayCandidates(registeredCandidates);
  } catch (error) {
    console.error("Error getting candidates:", error);
    registeredCandidates = JSON.parse(localStorage.getItem('registeredCandidates')) || [];
    displayCandidates(registeredCandidates);
  }
}


  function displayCandidates(candidates) {
    console.log("Displaying candidates:", candidates);
    if (candidates.length === 0) {
        candidateBoard.innerHTML = `
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
            <tr>
              <td colspan="2">No candidates available</td>
            </tr>
        `;
    } else {
        candidateBoard.innerHTML = `
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
            ${candidates.map(c => `
              <tr>
                <td>${ethers.BigNumber.from(c.id).toNumber()}</td>
                <td>${c.name}</td>
              </tr>
            `).join('')}
        `;
    }
}


async function hasVoted() {
  try {
    const voterAddress = await signer.getAddress();
    const voted = await contract.voterStatus(voterAddress);
    return voted;
  } catch (error) {
    console.error("Error checking voter status:", error);
    return false;
  }
}

async function sendVote() {
  try {
    const voteValue = parseInt(voteInput.value, 10);
    console.log("Vote value:", voteValue);

    // Check if the voter has already voted
    const hasAlreadyVoted = await hasVoted();
    if (hasAlreadyVoted) {
      alert("You have already voted.");
      return;
    }

    // Send the vote directly to the contract
    console.log("Sending vote...");
    const tx = await contract.voteTo(voteValue);
    console.log("Transaction sent:", tx);

    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);

    alert("Your vote has been recorded successfully!");

    await checkElectionStatus();
    await getAllCandidates();
  } catch (error) {
    console.error("Error sending vote:", error);
    alert("Failed to send vote. Please check the console for more details.");
  }
}





  

async function showResult() {
  try {
    const results = await contract.retrieveVotes();
    displayResults(results);
  } catch (error) {
    console.error("Error getting results:", error);
    alert("Failed to retrieve results. " + error.message);
  }
}

  function displayResults(results) {
    resultBoard.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Votes</th>
      </tr>
      ${results.map(r => `
        <tr>
          <td>${ethers.BigNumber.from(r.id).toNumber()}</td> <!-- Convert BigNumber to number -->
          <td>${r.name}</td>
          <td>${ethers.BigNumber.from(r.numberofVotes).toNumber()}</td> <!-- Convert BigNumber to number -->
        </tr>
      `).join('')}
    `;
    resultDiv.style.display = 'block';
  }
  

  async function startElection() {
    if (!isOwner) {
      alert("Only the contract owner can start the election.");
      return;
    }
  
    try {
      // Check if an election is already ongoing
      const isElectionActive = await contract.electionStarted();
      if (isElectionActive) {
        alert("An election is already in progress. Please wait for it to finish before starting a new one.");
        return;
      }
  
      // Validate candidates input
      const candidates = candidatesInput.value.split(',').map(c => c.trim());
      if (candidates.length === 0 || candidates.some(c => !c)) {
        alert("Please enter valid candidate names.");
        return;
      }
  
      // Validate election duration input
      const duration = parseInt(electionDurationInput.value, 10);
      if (isNaN(duration) || duration <= 0) {
        alert("Please enter a valid election duration.");
        return;
      }
  
      // Start the election
      const tx = await contract.startElection(candidates, duration);
      await tx.wait();
  
      console.log("Election started successfully");
      alert("Election has been started!");
      checkElectionStatus();
    } catch (error) {
      console.error("Error starting election:", error);
      alert("Failed to start election. " + error.message);
    }
  }
  
  
  

  async function addCandidate() {
    if (!isOwner) {
      alert("Only the contract owner can add candidates.");
      return;
    }
    try {
      await contract.addCandidate(candidateNameInput.value);
      console.log("Candidate added successfully");
      alert("Candidate has been added!");
      getAllCandidates();
      candidateNameInput.value = '';
    } catch (error) {
      console.error("Error adding candidate:", error);
      alert("Failed to add candidate. " + error.message);
    }
  }
  

  // Event Listeners
  connectWalletBtn.addEventListener('click', connectWallet);
  voteBtn.addEventListener('click', sendVote);
  showResultBtn.addEventListener('click', showResult);
  startElectionBtn.addEventListener('click', startElection);
  addCandidateBtn.addEventListener('click', addCandidate);
});


const hre = require("hardhat");
async function main() {
    const votingContract= await hre.ethers.getContractFactory("Voting");
    const deployedVotingContract = await votingContract.deploy();

    console.log('Contract address deployed:',deployedVotingContract.target);


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// Contract address deployed: 0xE9034951dC45788B339a27993fd2499BdabF8A90
// https://amoy.polygonscan.com/address/0xE9034951dC45788B339a27993fd2499BdabF8A90#code
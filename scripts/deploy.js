const hre = require("hardhat");

async function main() {
  // Get the Contract Factory
  const Voting = await hre.ethers.getContractFactory("Voting");

  // Define Candidate Names
  const candidates = ["Alice", "Bob", "Charlie"];

  // Deploy Contract with Candidate Names
  const voting = await Voting.deploy(candidates);

  // Wait for Deployment
  await voting.waitForDeployment();

  // Get Contract Address
  console.log(`Voting contract deployed to: ${await voting.getAddress()}`);
}

// Execute Deployment Script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
  gasReporter: {
    enabled: true,        // Enable Gas Reporting
    currency: "USD",      // Display gas cost in USD
    outputFile: "gas-report.txt", // Save report to a file
    noColors: true,       // Remove colors for better readability in logs
  },
};

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
  let Voting, voting, owner, addr1, addr2;

  beforeEach(async function () {
    Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy(["Alice", "Bob", "Charlie"]);
    await voting.waitForDeployment();
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should deploy with correct candidate names", async function () {
    expect(await voting.candidatesCount()).to.equal(3);
  });

  it("Should allow a voter to cast a vote", async function () {
    await voting.connect(addr1).vote(0);
    const candidate = await voting.candidates(0);
    expect(candidate.voteCount).to.equal(1);
  });

  it("Should not allow double voting", async function () {
    await voting.connect(addr1).vote(0);
    await expect(voting.connect(addr1).vote(0)).to.be.revertedWith("You have already voted.");
});

});

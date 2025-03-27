const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting", function () {
    let Voting, voting, owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        Voting = await ethers.getContractFactory("Voting");
        voting = await Voting.deploy(["Alice", "Bob"]); // REMOVE `.deployed()`
    });

    it("Should register candidates correctly", async function () {
        const candidate0 = await voting.getCandidate(0);
        expect(candidate0[0]).to.equal("Alice");
    });

    it("Should allow a voter to cast a vote", async function () {
        await voting.connect(addr1).vote(0);
        const candidate0 = await voting.getCandidate(0);
        expect(candidate0[1]).to.equal(1);
    });

    it("Should not allow double voting", async function () {
        await voting.connect(addr1).vote(0);
        await expect(voting.connect(addr1).vote(0)).to.be.revertedWith("You have already voted.");
    });
});

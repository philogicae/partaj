import { expect } from "chai";
import { ethers } from "hardhat";
import { Partaj } from "../typechain-types";

describe("Partaj", function () {
  let contract: Partaj;
  before(async () => {
    const [owner] = await ethers.getSigners();
    const contractFactory = await ethers.getContractFactory("Partaj");
    contract = (await contractFactory.deploy(owner.address)) as Partaj;
    await contract.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should have the right name", async function () {
      expect(await contract.name()).to.equal("Partaj");
    });
  });
});

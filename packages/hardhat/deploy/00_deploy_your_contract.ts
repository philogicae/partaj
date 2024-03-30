import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployPartaj: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Partaj", {
    from: deployer,
    args: [],
    log: true,
  });

  const contract = await hre.ethers.getContract<Contract>("Partaj", deployer);
  console.log("Contract name:", await contract.name());
};

export default deployPartaj;
deployPartaj.tags = ["Partaj"];

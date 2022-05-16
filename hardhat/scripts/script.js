// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main () {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const PunkCity = await ethers.getContractFactory("PunkCities");
  const punkCity = await PunkCity.deploy();
  await punkCity.deployed("punk");
  console.log("punk");

  // const BusinessNFT = await ethers.getContractFactory("BusinessNFT");
  // const businessNFT = await BusinessNFT.deploy();
  // await businessNFT.deployed();

  // const PlaceToken = await ethers.getContractFactory("PlaceToken");
  // const placeToken = await PlaceToken.deploy();
  // await placeToken.deployed();

  // const ServiceNFT = await ethers.getContractFactory("ServiceNFT");
  // const serviceNFT = await ServiceNFT.deploy();
  // await serviceNFT.deployed();

  // console.log("PlaceToken deployed to:", placeToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

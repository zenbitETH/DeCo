/* eslint-disable */ 
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("PunkCities", function () {

  beforeEach(async() => {
      const PunkCities = await ethers.getContractFactory("PunkCities");
      punkCities = await PunkCities.deploy();
      await punkCities.deployed("punk");

      const BusinessNFT = await ethers.getContractFactory("BusinessNFT");
      businessNFT = await BusinessNFT.deploy(punkCities.address);
      await businessNFT.deployed();
      //console.log("it's just business");

      const PlaceToken = await ethers.getContractFactory("PlaceToken");
      placeToken = await PlaceToken.deploy();
      await placeToken.deployed();
      //console.log("Happy place");

      const signers = await ethers.getSigners();
      addr0 = signers[0];
      addr1 = signers[1];
      
   
  });

  it("Should return the new PunkCities once it's deployed", async function () {
        const contractAddress = punkCities.address;
        console.log(contractAddress);
  });

  it("Should return the new BusinessNFT once it's deployed", async function () {
      const contractAddress = businessNFT.address;
      console.log(contractAddress);
  });

  it("Should return the new PlaceToken once it's deployed", async function () {
        const contractAddress = placeToken.address;
        console.log(contractAddress);
  });

  it("Should register a user in Punk Cities", async function () {
    const user = await punkCities.registerUser(
              "Test User",
              "Berlin",
              "Germany"
    )
  });

  it("Should register a place in Punk Cities with a registered user", async function () {
    const user = await punkCities.registerUser(
      "Test User",
      "Berlin",
      "Germany"
    )
    const place = await punkCities.registerPlace(
      0, 
      0, 
      "some ipfs hash"
    )
  });

  it("Should not be able to register a place with unregistered user", async function () {
    await expect (
      punkCities.registerPlace(
      0, 
      0, 
      "some ipfs hash"
      )
    ).to.be.revertedWith('This user is not registered')   
  });

  it("Should verify a place in Punk Cities with a registered user", async function () {
    const user = await punkCities.registerUser(
      "Test User",
      "Berlin",
      "Germany"
    )
    const place = await punkCities.registerPlace(
      0, 
      0, 
      "some ipfs hash"
    )
    const user2 = await punkCities.connect(addr1).registerUser(
      "Test User2",
      "Frankfurt",
      "Germany"
    )
    const verifyPlace = await punkCities.connect(addr1).verifyPlace(
      0,
      0,
    )
    console.log(verifyPlace);
  });

  it("Should not be able to create a business NFT due to unregistration", async function () {
    await expect (
      businessNFT.createBusiness(
      "Berlin", 
      "This is a laundromat", 
      "some google address",
      "Laudromat.logo",
      ["washes clothes", "drys clothes"],
      )
    ).to.be.revertedWith('You must be registered for Punk Cities in order to create a Business')   
  });

  it("Should be able to create a business NFT", async function () {

    const user = await punkCities.registerUser(
      "Test User",
      "Berlin",
      "Germany"
    )
    const place = await punkCities.registerPlace(
      0, 
      0, 
      "some ipfs hash"
    )
    const user2 = await punkCities.connect(addr1).registerUser(
      "Test User2",
      "Frankfurt",
      "Germany"
    )
    const verifyPlace = await punkCities.connect(addr1).verifyPlace(
      0,
      0,
    )

    const businessNFTcreated = await businessNFT.connect(addr0).createBusiness(
      "Berlin", 
      "This is a laundromat", 
      "some google address",
      "Laudromat.logo",
      ["washes clothes", "drys clothes"],
    )
    console.log(businessNFTcreated);
  });

  it("Should not be able to create two businesses", async function () {

    const user = await punkCities.registerUser(
      "Test User",
      "Berlin",
      "Germany"
    )
    const place = await punkCities.registerPlace(
      0, 
      0, 
      "some ipfs hash"
    )
    const user2 = await punkCities.connect(addr1).registerUser(
      "Test User2",
      "Frankfurt",
      "Germany"
    )
    const verifyPlace = await punkCities.connect(addr1).verifyPlace(
      0,
      0,
    )

    const businessNFTcreated = await businessNFT.connect(addr0).createBusiness(
      "Berlin", 
      "This is a laundromat", 
      "some google address",
      "Laudromat.logo",
      ["washes clothes", "drys clothes"],
    )

    await expect (
      businessNFT2created = businessNFT.connect(addr0).createBusiness(
      "Berlin", 
      "This is a laundromat", 
      "some google address",
      "Laudromat.logo",
      ["washes clothes", "drys clothes"],
      )
    ).to.be.revertedWith('You already own a business')  
  });
  
      // register user
      // create business NFT with an ID
      // create service NFTs
      // each person can only have 1 business NFT



});

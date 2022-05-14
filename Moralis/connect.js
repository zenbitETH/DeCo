const serverUrl = "https://kvodoqmgm9we.usemoralis.com:2053/server";
const appId = "sQ3GxCFmtJ493YXHvDBaEfms2j9dYucCb0pcq9Ts";

Moralis.enableWeb3();

const web3 = new Web3(window.ethereum);

const PunkCityAddress = "";
const BusinessNFTAddress = "";
const ServiceNFTAddress = "";

document.getElementById("connectWallet").onclick = connectWallet;
document.getElementById("logOut").onclick = logOut;

async function connectWallet() {
    let user = Moralis.User.current();
    if(!user) {
        user = await Moralis.authenticate({
            signingMessage: "Log in using Moralis"
        })
        .then(function (user){
      //      console.log("logged in: ", user);
            let ethAddress = user.get("ethAddress");
            document.getElementById("connectWallet").textContent = `${ethAddress}`;
        })
        .catch(function (error) {
            console.log(error);
        });
    } else {
        let ethAddress = user.get("ethAddress");
        document.getElementById("connectWallet").textContent = `${ethAddress}`;
    }
    Moralis.start({ appId, serverUrl });
}

async function logOut() {
    await Moralis.User.logOut();
    document.getElementById("getWallet").textContent = "Connect Wallet";
  }


async function registerForPunkCity() {

    var ABI = [

    ];
    const options = {
        contractAddress: PunkCityAddress,
        functionName: "registerUser",
        abi: ABI,
        params: {_name: name, _hometown: hometown, _country: country},

    };

    let register = await Moralis.executeFunction(options);

}

async function registerPlace(placeType, questType, ipfsUri) {
    var ABI = [

    ];

    const options = {
        contractAddress: PunkCityAddress,
        functionName: "registerPlace",
        abi: ABI,
        params: {_placeType: placeType, _questType:questType, _ipfsUri:ipfsUri},
    };
    let placeRegister = await Moralis.executeFunction(options);

}

async function createBusinessNFT(_cityName, _description, googleAddress, logo, services) {
    var ABI = [

    ];
    const options = {
        contractAddress: BusinessNFTAddress,
        functionName: "createBusiness",
        abi: ABI,
        params: {cityName: _cityName, description: _description, _googleAddress:googleAddress, _logo:logo, _services:services}
    }

    let creation = await Moralis.executeFunction(options);
}


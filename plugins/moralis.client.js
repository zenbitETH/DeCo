import Moralis from "moralis";
// import Web3 from "web3";
export default function({$config}){
  Moralis.enableWeb3();
  Moralis.start({appId:$config.moralisAppId,serverUrl:$config.moralisServerUrl});



  //initMoralis();
  // const web3 = new Web3(window.ethereum);
} 


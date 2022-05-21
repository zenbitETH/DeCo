import Moralis from 'moralis';

let soldNFTs= 0;

export default async function (){
    await Moralis.start({
        appId,serverUrl
    });

    await Moralis.enableWeb3();
    var ABI = [
        {
            "inputs": [],
            "name": "getSoldNFTs",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const options = {
        chain: "mumbai",
        address: this.$config.contractServiceNft,
        function_name:"getSoldNFTs",
        abi: ABI
    };

    soldNFTs = await Moralis.Web3API.native.runContractFunction(options);
}

// const getSoldsNFTs = async () =>{

// }
// const init = async () => {

// }
// init();

export default async function(){
    await Moralis.start({
        appId,serverUrl
    });

    const web3 = new Web3(window.ethereum);

    Moralis.initPlugins();
    const covalent = Moralis.Plugins.covalent;
    await getSoldsNFTs();



    // Ezt nagyon magyarázni nem kell, meghívja a contracton lévő NFT-ket egyesével
    const result = await covalent.getNftTokenIdForContract({
        chainId: 80001,
        contractAddress : contractAddress,
        pageNumber: 10,
        pageSize: 100
    });
    //Itt így ki tudjuk számolni mennyi NFT van jelenleg Salen, mindig
    console.log("Available On-sale NFTs: ", result.data.items.length - soldNFTs);


    // Ez itt meg tudja hívni egy adott ERC20 tokennek a balancát, például MATIC
    const vaultBalance = await covalent.getTokenBalancesForAddress({
        chainId: 80001,
        address: vaultAddress,
        quoteCurrency: "MATIC"
    });
    console.log("MATIC Balance for Vault is: ", vaultBalance.data.items[0].balance);

    const userMaticBalance = await covalent.getTokenBalancesForAddress({
        chainId: 80001,
        address: ethereum.selectedAddress,
        quoteCurrency: "MATIC"
    });

    console.log("Your MATIC Balance is: " , userMaticBalance.data.items[0].balance);
};

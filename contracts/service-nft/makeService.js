import Moralis from 'moralis'
import abi from './abi.json'

export default async function (address, form, tokenId) {
  const options = {
    contractAddress: address,
    functionName: 'makeService',
    abi,
    params: {
      servicePrice: Moralis.Units.ETH(form.price), // form.price * Math.pow(10, 18),
      _serviceDescription: form.description,
      tokenURI: form.logoPicture, // ipfs://bafyreibhhe2j2uazqh4epvtikp2wjpcn6upskhtjeuiaimqtrry3vcxhvm/metadata.json
      businessId: parseInt(tokenId)
      // _serviceName: form.serviceName
    }
  }

  console.log(options)

  const txHash = await Moralis.executeFunction(options)
  console.log(txHash)
  return txHash
}

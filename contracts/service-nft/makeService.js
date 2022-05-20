
import Moralis from 'moralis'
import abi from './abi.json'

export default async function (address, form) {
  const options = {
    contractAddress: address,
    functionName: 'makeService',
    abi,
    params: {
      servicePrice: form.price * Math.pow(10, 18),
      _serviceDescription: form.description,
      tokenURI: form.imageUrl// ipfs://bafyreibhhe2j2uazqh4epvtikp2wjpcn6upskhtjeuiaimqtrry3vcxhvm/metadata.json
    }
  }

  await Moralis.executeFunction(options)
}

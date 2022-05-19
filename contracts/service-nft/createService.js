
import Moralis from 'moralis'

const ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'servicePrice',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: '_serviceDescription',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'tokenURI',
        type: 'string'
      }
    ],
    name: 'makeService',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

export default async function (address, form) {
  const options = {
    contractAddress: address,
    functionName: 'makeService',
    abi: ABI,
    params: {
      servicePrice: form.price * Math.pow(10, 18),
      _serviceDescription: form.description,
      tokenURI: form.imageUrl// ipfs://bafyreibhhe2j2uazqh4epvtikp2wjpcn6upskhtjeuiaimqtrry3vcxhvm/metadata.json
    }
  }

  await Moralis.executeFunction(options)
}

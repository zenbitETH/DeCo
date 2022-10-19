import Moralis from 'moralis'
// import { normalizeContractOutput } from '../methods'
import abi from './abi.json'

export default async function (address, tokenId) {
  const options = {
    contractAddress: address,
    functionName: 'getyourIpfsHashbyTokenid',
    abi,
    params: {
      _tokenId: parseInt(tokenId)
    }
  }

  const getLogoPicture = await Moralis.executeFunction(options)
  console.log('Your logo Picture is', getLogoPicture)
  return getLogoPicture
}

// const ABI = [
//   {
//     inputs: [],
//     name: 'getyourIpfsHash',
//     outputs: [
//       {
//         internalType: 'string',
//         name: '',
//         type: 'string'
//       }
//     ],
//     stateMutability: 'view',
//     type: 'function'
//   }
// ]
// const options = {
//   contractAddress: address,
//   funcionName: 'getyourIpfsHash',
//   abi: ABI
// }
// green part here probably won't be neede

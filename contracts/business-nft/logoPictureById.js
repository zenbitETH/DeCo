import Moralis from 'moralis'
// import { normalizeContractOutput } from '../methods'
import abi from './abi.json'

export default async function (address, tokenId) {
  const options = {
    contractAddress: address,
    functionName: 'getAllIpfsHashbyTokenId',
    abi,
    params: {
      _tokenId: parseInt(tokenId)
    }
  }

  const logoPictureId = await Moralis.executeFunction(options)
  console.log('Your logo Picture is', logoPictureId)
  return logoPictureId
}

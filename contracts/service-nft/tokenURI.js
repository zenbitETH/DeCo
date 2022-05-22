
import Moralis from 'moralis'
import abi from './abi.json'

export default async function (address, tokenId) {
  const options = {
    contractAddress: address,
    functionName: 'tokenURI',
    abi,
    params: {
      tokenId
    }
  }

  return await Moralis.executeFunction(options)
}

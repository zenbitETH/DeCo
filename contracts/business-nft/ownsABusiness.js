
import Moralis from 'moralis'
import abi from './abi.json'

export default async function (address, userAddress) {
  const options = {
    contractAddress: address,
    functionName: 'ownsABusiness',
    abi,
    params: {
      _businessOwner: userAddress
    }
  }

  return await Moralis.executeFunction(options)
}

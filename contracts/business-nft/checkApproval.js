import Moralis from 'moralis'
import abi from './abi.json'

export default async function (address) {
  const options = {
    contractAddress: address,
    functionName: 'checkApproval',
    abi,
    params: {

    }
  }

  return await Moralis.executeFunction(options)
}

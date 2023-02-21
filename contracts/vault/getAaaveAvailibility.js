
import Moralis from 'moralis'
// import { normalizeContractOutput } from '../methods'
import abi from './abi.json'

export default async function (address, userAddress) {
  const options = {
    contractAddress: address,
    functionName: 'getAaaveAvailibility',
    abi,
    params: {
      _user: userAddress
    }
  }
  //   const result = normalizeContractOutput(await Moralis.executeFunction(options))
  const result = await Moralis.executeFunction(options)
  return parseInt(result)
}

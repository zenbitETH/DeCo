
import Moralis from 'moralis'
import { normalizeContractOutput } from '../methods'
import abi from './abi.json'

export default async function (address) {
  const options = {
    contractAddress: address,
    functionName: 'getBusinessByOwner',
    abi
  }
  const result = normalizeContractOutput(await Moralis.executeFunction(options))

  console.log(result)
  return result
}

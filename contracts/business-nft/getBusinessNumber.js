
import Moralis from 'moralis'
// import { normalizeContractOutput } from '../methods'
import abi from './abi.json'

export default async function (address) {
  const options = {
    contractAddress: address,
    functionName: 'getBusinessNumber',
    abi
  }
  //   const result = normalizeContractOutput(await Moralis.executeFunction(options))
  const result = await Moralis.executeFunction(options)
  return parseInt(result)
}

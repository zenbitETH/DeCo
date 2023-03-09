
import Moralis from 'moralis'
import { normalizeContractOutput } from '../methods'
import abi from './abi.json'

export default async function (address, businessId) {
  const options = {
    contractAddress: address,
    functionName: 'getAllSoldServices',
    abi,
    params: {
      _businessId: parseInt(businessId)
    }
  }
  const result = await Moralis.executeFunction(options)
  console.log(result)
  const normalized = result.map(item => normalizeContractOutput(item))
  return normalized
  // return (await Moralis.executeFunction(options)).map(item => normalizeContractOutput(item))
}

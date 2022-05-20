
import Moralis from 'moralis'
import { normalizeContractOutput } from '../methods'
import abi from './abi.json'

export default async function (address) {
  const options = {
    contractAddress: address,
    functionName: 'listAllBusinessNfts',
    abi
  }

  const result = await Moralis.executeFunction(options)
  console.log(result)
  const normalized = result.map(item => normalizeContractOutput(item))
  return normalized
}

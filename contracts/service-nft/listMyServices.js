
import Moralis from 'moralis'
import { normalizeContractOutput } from '../methods'
import abi from './abi.json'

export default async function (address, businessId) {
  const options = {
    contractAddress: address,
    functionName: 'listMyServices',
    abi,
    params: {
      _businessId: businessId + 1
    }
  }

  return (await Moralis.executeFunction(options)).map(item => normalizeContractOutput(item))
}

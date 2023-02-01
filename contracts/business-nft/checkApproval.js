import Moralis from 'moralis'
import { normalizeContractOutput } from '../methods'
import abi from './abi.json'

export default async function (address) {
  const options = {
    contractAddress: address,
    functionName: 'checkApproval',
    abi,
    params: {

    }
  }

  return await normalizeContractOutput(await Moralis.executeFunction(options))
}

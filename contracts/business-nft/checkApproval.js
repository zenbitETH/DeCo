import Moralis from 'moralis'
// import { normalizeContractOutput } from '../methods'
import abi from './abi.json'

export default async function (address, walletAddress, businessContract) {
  const options = {
    contractAddress: address,
    functionName: 'checkApproval',
    abi,
    params: {
      _owner: walletAddress
    }
  }

  // const result = await normalizeContractOutput(await Moralis.executeFunction(options))
  const result = await Moralis.executeFunction(options)
  // console.log(result)
  return result
}

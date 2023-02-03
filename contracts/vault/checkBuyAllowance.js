import Moralis from 'moralis'
// import { normalizeContractOutput } from '../methods'
import abi from './abi.json'

export default async function (address, buyerAddress) {
  const options = {
    contractAddress: address,
    functionName: 'checkBuyAllowance',
    abi,
    params: {
      buyerAddress
    }
  }

  // const result = await normalizeContractOutput(await Moralis.executeFunction(options))
  const result = await Moralis.executeFunction(options)
  // console.log(result)
  return result
}

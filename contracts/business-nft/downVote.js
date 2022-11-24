
import Moralis from 'moralis'
import { normalizeContractOutput } from '../methods'
import abi from './abi.json'

export default async function (address, tokenId) {
  const options = {
    contractAddress: address,
    functionName: 'downVote',
    abi,
    params: {
      _businessId: parseInt(tokenId)
    }
  }
  const result = normalizeContractOutput(await Moralis.executeFunction(options))
  console.log(result)
  alert('You successfully made a vote for this business. In order to see the result please refresh the page after the Metamask Transaction')
  return result
}

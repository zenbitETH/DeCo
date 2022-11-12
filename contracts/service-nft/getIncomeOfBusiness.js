
import Moralis from 'moralis'
// import { normalizeContractOutput } from '../methods'
import abi from './abi.json'

export default async function (address, tokenId) {
  const options = {
    contractAddress: address,
    functionName: 'getIncomeOfBusiness',
    abi,
    params: {
      _businessId: parseInt(tokenId)
    }
  }
  const soldNFTs = await Moralis.executeFunction(options)
  console.log('This business has ', soldNFTs)
  //   return (await Moralis.executeFunction(options)).map(item => normalizeContractOutput(item))
  return soldNFTs
}

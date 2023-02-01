import Moralis from 'moralis'
import daiAbi from './daiAbi.json'

export default async function (address, businessAddress) {
  const options = {
    contractAddress: address,
    functionName: 'approve',
    daiAbi,
    params: {
      spender: businessAddress,
      amount: 100000000000000000000000000
    }
  }
  const result = await Moralis.executeFunction(options)
  console.log(result)
  return result
}

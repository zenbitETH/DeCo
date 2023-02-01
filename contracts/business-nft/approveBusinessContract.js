import Moralis from 'moralis'
import dai from './dai.json'

export default async function (address, businessAddress) {
  const options = {
    contractAddress: address,
    functionName: 'approve',
    dai,
    params: {
      spender: businessAddress,
      amount: 100000000000000000000000000
    }
  }
  const result = await Moralis.executeFunction(options)
  console.log(result)
  return result
}

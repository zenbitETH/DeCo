import Moralis from 'moralis'
import dai from './dai.json'

export default async function (address, businessAddress) {
  const options = {
    contractAddress: address,
    functionName: 'approve',
    abi: dai,
    params: {
      spender: businessAddress,
      amount: Moralis.Units.ETH(100)
    }
  }
  const result = await Moralis.executeFunction(options)
  console.log(result)
  return result
}

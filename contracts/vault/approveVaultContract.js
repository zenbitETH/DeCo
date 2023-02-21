import Moralis from 'moralis'
import daiAbi from './daiAbi.json'

export default async function (address, businessAddress) {
  const options = {
    contractAddress: address,
    functionName: 'approve',
    abi: daiAbi,
    params: {
      spender: businessAddress,
      amount: Moralis.Units.ETH(100)
    }
  }
  console.log('asd', address, businessAddress)
  const result = await Moralis.executeFunction(options)
  console.log(result)
  return result
}

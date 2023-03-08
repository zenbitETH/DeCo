import Moralis from 'moralis'
import abi from './abi.json'

export default async function (address, userAddress, amount) {
  const options = {
    contractAddress: address,
    functionName: 'sendDaiOut',
    abi,
    params: {
      _address: userAddress,
      daiAmount: Moralis.Units.ETH(amount)
    }
  }
  const result = await Moralis.executeFunction(options)
  console.log(result)
  return result
}

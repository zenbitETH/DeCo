import Moralis from 'moralis'
import abi from './abi.json'

export default async function (address, userAddress) {
  const options = {
    contractAddress: address,
    functionName: 'approveAaveContract',
    abi,
    params: {
      _caller: userAddress,
      _amount: Moralis.Units.ETH(200)
    }
  }
  const result = await Moralis.executeFunction(options)
  console.log(result)
  return result
}

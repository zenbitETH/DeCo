
import Moralis from 'moralis'
import abi from './abi.json'

export default async function (address, amount) {
  const transferOptions = {
    type: 'erc20',
    amount: Moralis.Units.ETH(amount),
    receiver: address,
    contractAddress: '0x951ce0CFd38b4ADd03272C458Cc2973D77E2C000'
  }

  const options = {
    contractAddress: address,
    functionName: 'aaveWithdraw',
    abi,
    // msgValue: Moralis.Units.ETH(service.price / Math.pow(10, 18)), This is not needed anymore as we are using DAI
    params: {
      type: 'erc20',
      _amount: Moralis.Units.ETH(amount),
      contractAddress: '0x951ce0CFd38b4ADd03272C458Cc2973D77E2C000'
      // gasLimit: 100000000,
      // gasPrice: 30000000
    }
  }

  const result = await Moralis.transfer(transferOptions).then(async (result) => {
    await result.wait()
    const txHash = await Moralis.executeFunction(options)
    return txHash
  })
  console.log(result)
}

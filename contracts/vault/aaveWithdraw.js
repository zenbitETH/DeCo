
import Moralis from 'moralis'
import abi from './abi.json'

export default async function (address, amount) {
  const transferOptions = {
    type: 'erc20',
    amount: Moralis.Units.ETH(amount),
    receiver: address,
    contractAddress: '0xFAF6a49b4657D9c8dDa675c41cB9a05a94D3e9e9'
  }

  const options = {
    contractAddress: address,
    functionName: 'aaveWithdraw',
    abi,
    // msgValue: Moralis.Units.ETH(service.price / Math.pow(10, 18)), This is not needed anymore as we are using DAI
    params: {
      type: 'erc20',
      _amount: Moralis.Units.ETH(amount),
      contractAddress: '0xFAF6a49b4657D9c8dDa675c41cB9a05a94D3e9e9'
    }
  }

  const result = await Moralis.transfer(transferOptions).then(async (result) => {
    await result.wait()
    const txHash = await Moralis.executeFunction(options)
    return txHash
  })
  console.log(result)
}

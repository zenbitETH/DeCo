
import Moralis from 'moralis'
import abi from './abi.json'

export default async function (address, service, businessId, buyerAddress) {
  const options = {
    contractAddress: address,
    functionName: 'buy',
    abi,
    // msgValue: Moralis.Units.ETH(service.price / Math.pow(10, 18)), This is not needed anymore as we are using DAI
    params: {
      serviceId: service.serviceId,
      _businessId: parseInt(businessId),
      _buyerAddress: buyerAddress
    }
  }
  console.log(options)
  const txHash = await Moralis.executeFunction(options)
  return txHash
}

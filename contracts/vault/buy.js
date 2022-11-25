
import Moralis from 'moralis'
import abi from './abi.json'

export default async function (address, service, businessId) {
  const options = {
    contractAddress: address,
    functionName: 'buy',
    abi,
    msgValue: Moralis.Units.ETH(service.price / Math.pow(10, 18)),
    params: {
      serviceId: service.serviceId,
      _businessId: parseInt(businessId)
    }
  }
  console.log(options)
  const txHash = await Moralis.executeFunction(options)
  return txHash
}

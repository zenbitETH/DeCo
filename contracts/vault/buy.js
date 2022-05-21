
import Moralis from 'moralis'
import abi from './abi.json'

export default async function (address, service) {
  const options = {
    contractAddress: address,
    functionName: 'buy',
    abi,
    msgValue: Moralis.Units.ETH(service.price / Math.pow(10, 18)),
    params: {
      serviceId: service.serviceId
    }
  }

  await Moralis.executeFunction(options)
}

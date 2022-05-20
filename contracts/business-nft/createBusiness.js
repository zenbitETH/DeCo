
import Moralis from 'moralis'
import abi from './abi.json'

export default async function (address, form) {
  const options = {
    contractAddress: address,
    functionName: 'createBusiness',
    abi,
    params: {
      cityName: form.city,
      _businessType: form.type,
      kind: form.kind,
      description: form.description,
      name: form.name,
      _googleAddress: form.location,
      _services: []
    }
  }

  await Moralis.executeFunction(options)
}

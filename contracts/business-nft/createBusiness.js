
import Moralis from 'moralis'

const ABI = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'cityName',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_businessType',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'kind',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'name',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_googleAddress',
        type: 'string'
      },
      {
        internalType: 'string[]',
        name: '_services',
        type: 'string[]'
      }
    ],
    name: 'createBusiness',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]

export default async function (address, form) {
  console.log(Moralis.User.current())
  const options = {
    contractAddress: address,
    functionName: 'createBusiness',
    abi: ABI,
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

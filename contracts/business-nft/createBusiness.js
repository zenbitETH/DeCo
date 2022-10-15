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
      _services: [],
      URI: form.URI,
      ipfsHash: form.logoPicture
    }
  }

  const txHash = await Moralis.executeFunction(options)
  console.log(txHash)
  return txHash
  // await txHash.wait()
  // alert('You have successfully minted an NFT! your transaction hash is: ' + txHash.hash)
}

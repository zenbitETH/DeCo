
// export findAbiByName('')

export function normalizeContractOutput (output) {
  const normalized = {}
  Object.getOwnPropertyNames(output).forEach((key) => {
    if (isNaN(key)) {
      if (output[key] instanceof Object && !(output[key] instanceof Array)) {
        normalized[key] = parseInt(output[key]._hex, 16)
      } else {
        normalized[key] = output[key]
      }
    }
  })

  return normalized
}

import jsSha3 from 'js-sha3'

const sha3 = (x) => jsSha3.keccak256(x)

export function namehash(name) {
  let node = ''
  for (let i = 0; i < 32; i++) node += '00'

  const labels = name.split('.')

  for (var i = labels.length - 1; i >= 0; i--) {
    const labelSha = sha3(labels[i])
    node = sha3(Buffer.from(node + labelSha, 'hex'))
  }

  return '0x' + node
}
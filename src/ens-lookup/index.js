import { namehash } from './namehash'
import { ABI } from './abi'
import { Contract } from '@ethersproject/contracts'
import { getDefaultProvider } from '@ethersproject/providers'

const ENDPOINT = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens';

const QUERY = `
  query($domain: String!) {
    domains(where:{name: $domain}) { 
      resolvedAddress {
        id
      }
      resolver {
        texts
      }
      owner {
        id
      }
    }
  }
`;

const request = async (
  endpoint,
  query,
  variables,
  fetchOptions
) => {
  const res = await fetch(endpoint, {
    ...fetchOptions,
    body: JSON.stringify({ query, variables }),
    method: 'POST'
  });

  if (res.status === 200) {
    const json = await res.json();
    return json.data;
  } else {
    return null;
  }
}

export const getENS = (
  provider = getDefaultProvider(),
  contractAddress = '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41'
) => {
  const contract = new Contract(contractAddress, ABI, provider)

  const getRecord = async (node, record) => await contract.text(node, record)

  return async function getENS(_domain, fetchOptions) {
    const domain = /^0x[a-fA-F0-9]{40}$/.test(_domain) ? await provider.lookupAddress(_domain) : _domain

    const node = namehash(domain)

    const { domains } = await request(
      ENDPOINT,
      QUERY,
      {
        domain
      },
      fetchOptions
    )

    const records = {}

    if (domains?.[0]) {
      const { resolvedAddress: address, resolver, owner } = domains?.[0]

      let data = {
        owner: null,
        address: null,
        domain,
        records: {}
      }

      if (owner) data.owner = owner.id

      if (address) data.address = address.id

      if (!resolver?.texts) {
        return data
      } else {
        for (const record of resolver.texts) {
          if (record.startsWith('com.') || record.startsWith('vnd.')) {
            records[record.slice(record.indexOf('.') + 1)] = await getRecord(node, record)
          } else {
            records[record] = await getRecord(node, record)
          }
        }

        data.records = records

        return data
      }
    }
  }
}
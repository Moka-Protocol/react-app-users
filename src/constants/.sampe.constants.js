import { ChainId } from '@usedapp/core'

export const STABLECOINDECIMALS = {
	'dai': 18,
	'usdc': 6,
	'frax': 18,
	'ust': 18
};

export const NETWORKNAME = {
	ROPSTEN: 'Ropsten network',
	MUMBAI: 'Polygon Mumbai network',
	MATIC: 'Polygon Matic network'
};

export const BLOCKEXPLORERS = {
	ROPSTEN: 'https://ropsten.etherscan.io/',
	MUMBAI: 'https://mumbai.polygonscan.com/',
	MATIC: 'https://polygonscan.com/'
};

export const KEYS = {
	ROPSTEN: {
		CHAINID: ChainId.Ropsten,
		CHAINRPC: '',
		SUBGRAPH_URI: ''
	},
	MUMBAI: {
		CHAINID: ChainId.Mumbai,
		CHAINRPC: '',
		SUBGRAPH_URI: ''
	},
	MATIC: {
		CHAINID: ChainId.Polygon,
		CHAINRPC: '',
		SUBGRAPH_URI: ''
	}
};

export const CONTRACTS = {
	ROPSTEN: {
		MOKATOKEN: '0x85F1E769a5788d293C710f77Cfb01E7E148EE852',
		FORUMFACTORY: '0xC2f1E3782EF70bA760Fa93505A8C40B4f3512678',
		MOKATOKENSALE: '0x52014A8334aaf2C978BD741F5B4734459B2757Fb',
		ERC20: {
			dai: '0x3ac1c6ff50007ee705f36e40F7Dc6f393b1bc5e7',
			usdc: '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
			frax: '0x3ac1c6ff50007ee705f36e40F7Dc6f393b1bc5e7',
			ust: '0x3ac1c6ff50007ee705f36e40F7Dc6f393b1bc5e7'
		}
	},
	MUMBAI: {
		MOKATOKEN: '',
		FORUMFACTORY: '',
		MOKATOKENSALE: '',
		ERC20: {
			dai: '',
			usdc: '',
			frax: '',
			ust: ''
		}
	},
	MATIC: {
		MOKATOKEN: '',
		FORUMFACTORY: '',
		MOKATOKENSALE: '',
		ERC20: {
			dai: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
			usdc: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
			frax: '0x45c32fa6df82ead1e2ef74d17b76547eddfaff89',
			ust: '0x692597b009d13c4049a947cab2239b7d6517875f'
		}
	}
};

export const LINKS = {
	ABOUT: 'https://fantastic-smile-05e.notion.site/Moka-Protocol-b41bb5e124ea40b68e9e5228b8c26ae5',
	TOKENDISTRIBUTION: 'https://fantastic-smile-05e.notion.site/Token-Distribution-74c599121cba4bb7af317f2dff37fd7c',
	CONNECT: 'https://fantastic-smile-05e.notion.site/How-To-Connect-379fd550d0db46298c4086eeedbab7d5'
};

export const MOKALINKS = {
	ROPSTEN: {
		USERS: 'https://ropsten-users.moka.wiki/',
		LEADERBOARD: 'https://ropsten-leaderboard.moka.wiki/'
	},
	MATIC: {
		USERS: 'https://users.moka.wiki/',
		LEADERBOARD: 'https://leaderboard.moka.wiki/'
	}
}
import { RPCs } from 'helpers';
import { Chain } from 'wagmi';

export const mainnet = {
	id: 1,
	network: 'homestead',
	name: 'Ethereum',
	nativeCurrency: {
		name: 'Ether',
		symbol: 'ETH',
		decimals: 18,
	},
	rpcUrls: {
		alchemy: {
			http: [`https://eth-mainnet.g.alchemy.com/v2/${RPCs.alchemy.mainnet}`],
			webSocket: [`wss://eth-mainnet.g.alchemy.com/v2/${RPCs.alchemy.mainnet}`],
		},
		infura: {
			http: ['https://mainnet.infura.io/v3'],
			webSocket: ['wss://mainnet.infura.io/ws/v3'],
		},
		default: {
			http: [`https://eth-mainnet.g.alchemy.com/v2/${RPCs.alchemy.mainnet}`],
			webSocket: [`wss://eth-mainnet.g.alchemy.com/v2/${RPCs.alchemy.mainnet}`],
		},
		public: {
			http: [`https://eth-mainnet.g.alchemy.com/v2/${RPCs.alchemy.mainnet}`],
			webSocket: [`wss://eth-mainnet.g.alchemy.com/v2/${RPCs.alchemy.mainnet}`],
		},
	},
	blockExplorers: {
		etherscan: {
			name: 'Etherscan',
			url: 'https://etherscan.io',
		},
		default: {
			name: 'Etherscan',
			url: 'https://etherscan.io',
		},
	},
	contracts: {
		ensRegistry: {
			address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
		},
		ensUniversalResolver: {
			address: '0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62',
			blockCreated: 16966585,
		},
		multicall3: {
			address: '0xca11bde05977b3631167028862be2a173976ca11',
			blockCreated: 14353601,
		},
	},
} as Chain;

export const bsc = {
	id: 56,
	name: 'BNB Smart Chain',
	network: 'bsc',
	nativeCurrency: {
		decimals: 18,
		name: 'BNB',
		symbol: 'BNB',
	},
	rpcUrls: {
		default: {
			http: ['https://rpc.ankr.com/bsc'],
		},
		public: {
			http: ['https://rpc.ankr.com/bsc'],
		},
	},
	blockExplorers: {
		etherscan: {
			name: 'BscScan',
			url: 'https://bscscan.com',
		},
		default: {
			name: 'BscScan',
			url: 'https://bscscan.com',
		},
	},
	contracts: {
		multicall3: {
			address: '0xca11bde05977b3631167028862be2a173976ca11',
			blockCreated: 15921452,
		},
	},
} as Chain;

export const polygonMumbai = {
	id: 80001,
	name: 'Polygon Mumbai',
	network: 'maticmum',
	nativeCurrency: {
		name: 'MATIC',
		symbol: 'MATIC',
		decimals: 18,
	},
	rpcUrls: {
		alchemy: {
			http: [`https://polygon-mumbai.g.alchemy.com/v2/${RPCs.alchemy.mumbai}`],
			webSocket: [
				`wss://polygon-mumbai.g.alchemy.com/v2/${RPCs.alchemy.mumbai}`,
			],
		},
		infura: {
			http: ['https://polygon-mumbai.infura.io/v3'],
			webSocket: ['wss://polygon-mumbai.infura.io/ws/v3'],
		},
		default: {
			http: [`https://polygon-mumbai.g.alchemy.com/v2/${RPCs.alchemy.mumbai}`],
			webSocket: [
				`wss://polygon-mumbai.g.alchemy.com/v2/${RPCs.alchemy.mumbai}`,
			],
		},
		public: {
			http: [`https://polygon-mumbai.g.alchemy.com/v2/${RPCs.alchemy.mumbai}`],
			webSocket: [
				`wss://polygon-mumbai.g.alchemy.com/v2/${RPCs.alchemy.mumbai}`,
			],
		},
	},

	blockExplorers: {
		etherscan: {
			name: 'PolygonScan',
			url: 'https://mumbai.polygonscan.com',
		},
		default: {
			name: 'PolygonScan',
			url: 'https://mumbai.polygonscan.com',
		},
	},
	contracts: {
		multicall3: {
			address: '0xca11bde05977b3631167028862be2a173976ca11',
			blockCreated: 25770160,
		},
	},
	testnet: true,
} as Chain;

export const polygon = {
	id: 137,
	name: 'Polygon',
	network: 'matic',
	nativeCurrency: {
		name: 'MATIC',
		symbol: 'MATIC',
		decimals: 18,
	},
	rpcUrls: {
		alchemy: {
			http: [
				`https://polygon-mainnet.g.alchemy.com/v2/${RPCs.alchemy.polygon}`,
			],
			webSocket: [
				`wss://polygon-mainnet.g.alchemy.com/v2/${RPCs.alchemy.polygon}`,
			],
		},
		infura: {
			http: ['https://polygon-mainnet.infura.io/v3'],
			webSocket: ['wss://polygon-mainnet.infura.io/ws/v3'],
		},
		default: {
			http: [
				`https://polygon-mainnet.g.alchemy.com/v2/${RPCs.alchemy.polygon}`,
			],
			webSocket: [
				`wss://polygon-mainnet.g.alchemy.com/v2/${RPCs.alchemy.polygon}`,
			],
		},
		public: {
			http: [
				`https://polygon-mainnet.g.alchemy.com/v2/${RPCs.alchemy.polygon}`,
			],
			webSocket: [
				`wss://polygon-mainnet.g.alchemy.com/v2/${RPCs.alchemy.polygon}`,
			],
		},
	},
	blockExplorers: {
		etherscan: {
			name: 'PolygonScan',
			url: 'https://polygonscan.com',
		},
		default: {
			name: 'PolygonScan',
			url: 'https://polygonscan.com',
		},
	},
	contracts: {
		multicall3: {
			address: '0xca11bde05977b3631167028862be2a173976ca11',
			blockCreated: 25770160,
		},
	},
} as Chain;

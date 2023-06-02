import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { bsc, mainnet, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { RPCs } from 'helpers';

// Set up chains
const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet, bsc, polygonMumbai],
	[
		alchemyProvider({ apiKey: RPCs.alchemy.mainnet as string }),
		alchemyProvider({ apiKey: RPCs.alchemy.polygon as string }),
		alchemyProvider({ apiKey: RPCs.alchemy.mumbai as string }),
		publicProvider(),
	]
);

// Set up client
const config = createConfig({
	autoConnect: true,
	connectors: [
		new MetaMaskConnector({ chains }),
		new CoinbaseWalletConnector({
			chains,
			options: {
				appName: 'Cali.Finance',
			},
		}),
		new WalletConnectConnector({
			chains,
			options: {
				projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
					? process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
					: '',
				showQrModal: true,
			},
		}),
		new InjectedConnector({
			chains,
			options: {
				name: 'Injected',
				shimDisconnect: true,
			},
		}),
		// new InjectedConnector({
		// 	options: {
		// 		name: 'Binance Wallet',
		// 		getProvider: () =>
		// 			typeof window !== 'undefined' ? window.BinanceChain : undefined,
		// 	},
		// }),
	],
	publicClient,
	webSocketPublicClient,
});

// Set up wrapper interface
interface ProviderProps {
	children: React.ReactNode;
}

// Set up wrapper component
export const WagmiWrapper: React.FC<ProviderProps> = ({ children }) => (
	<WagmiConfig config={config}>{children}</WagmiConfig>
);

import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { bsc, mainnet, polygon, polygonMumbai } from 'utils';

// Set up chains
const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet, bsc, polygonMumbai, polygon],
	// [polygon],
	[publicProvider()]
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
				projectId: '06a76e1eb9bf42d2ccb938629bffd0af',
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

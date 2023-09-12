import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ColorHandler } from 'utils';
import { WagmiWrapper } from 'wrappers';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps: { ...pageProps } }: AppProps) => (
	<>
		<Head>
			<title>
				Cali - Real-Time Payroll Payments & Crypto Payroll Automation
			</title>
			<meta
				name="description"
				content="Revolutionize your business with Cali's real-time payroll payments. Pay-per-second processing, customizable payment schedules, and a decentralized system. Pay only 0.5% fees."
			/>
			<meta
				name="keywords"
				content="real-time payroll, crypto payroll, decentralized payroll, payroll automation, employee payments, Cali"
			/>
			<meta name="author" content="Cali Payroll Solutions" />
			<meta
				property="og:title"
				content="Cali - Real-Time Payroll Payments & Crypto Payroll Automation"
			/>
			<meta
				property="og:description"
				content="Pay your employees per second with Cali's revolutionary payroll technology. Improve employee morale, gain control, and save money."
			/>
			<meta property="og:image" content="/meta/landing.jpeg" key="ogimage" />
			<meta property="og:url" content="https://cali.finance" key="ogurl" />
			<meta name="twitter:card" content="/meta/landing.jpeg" />
			<meta
				name="twitter:title"
				content="Cali - Real-Time Payroll Payments & Crypto Payroll Automation"
			/>
			<meta
				name="twitter:description"
				content="Revolutionize your payroll process with Cali. Pay-per-second, customizable schedules, and a decentralized system."
			/>
			<meta name="twitter:image" content="meta/landing.jpeg" />
			<link rel="icon" href="/favicon.svg" />
		</Head>
		<WagmiWrapper>
			<QueryClientProvider client={queryClient}>
				<ColorHandler cookies={pageProps.cookies}>
					<Component {...pageProps} />
				</ColorHandler>
			</QueryClientProvider>
		</WagmiWrapper>
	</>
);

export default MyApp;

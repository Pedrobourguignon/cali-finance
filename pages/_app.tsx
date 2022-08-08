import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ColorHandler } from 'utils'

const MyApp = ({ Component, pageProps }: AppProps) => (
	<>
		<Head>
			<title>Cali Finance</title>
			<meta name="description" content="" />
			<meta property="og:url" content="https://cali.finance" key="ogurl" />
			<meta property="og:image" content="/meta.png" key="ogimage" />
			<meta property="og:site_name" content="Cali Finance" key="ogsitename" />
			<meta property="og:title" content="Cali Finance" key="ogtitle" />
			<meta
				property="og:description"
				content="Swap, earn, and build with the leading decentralized crypto trading protocol on Syscoin."
				key="ogdesc"
			/>
			<link rel="icon" href="/favicon.ico" />
			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content="https://pegasys.finance" />
			<meta property="twitter:title" content="Pegasys Protocol" />
			<meta
				property="twitter:description"
				content="Swap, earn, and build with the leading decentralized crypto trading protocol on Syscoin."
			/>
			<meta property="twitter:image" content="/meta.png" />
		</Head>
		<ColorHandler cookies={pageProps.cookies}>
			<Component {...pageProps} />
		</ColorHandler>
	</>
)

export default MyApp

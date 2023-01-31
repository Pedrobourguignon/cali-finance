import { CompaniesContainer } from 'containers';
import { TokensProvider } from 'contexts';

import type { NextPage } from 'next';

const index: NextPage = () => (
	<TokensProvider>
		<CompaniesContainer />
	</TokensProvider>
);

export default index;

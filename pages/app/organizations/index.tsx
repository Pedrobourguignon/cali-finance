import { OrganizationsContainer } from 'containers';
import { TokensProvider } from 'contexts';

import type { NextPage } from 'next';

const index: NextPage = () => (
	<TokensProvider>
		<OrganizationsContainer />;
	</TokensProvider>
);

export default index;

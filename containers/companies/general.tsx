import { Flex } from '@chakra-ui/react';
import { CompaniesProvider } from 'contexts';
import { CompaniesLayoutNoConnected, CompaniesConnected } from 'layouts';
import { useSession } from 'next-auth/react';

export const CompaniesContainer = () => {
	const { data: session } = useSession();
	return (
		<CompaniesProvider>
			<Flex>
				{session ? <CompaniesConnected /> : <CompaniesLayoutNoConnected />}
			</Flex>
		</CompaniesProvider>
	);
};

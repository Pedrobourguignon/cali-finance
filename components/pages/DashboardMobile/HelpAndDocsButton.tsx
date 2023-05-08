import { Flex, FlexProps, Link } from '@chakra-ui/react';
import React from 'react';
import { navigationPaths } from 'utils';
import NextLink from 'next/link';
import useTranslation from 'next-translate/useTranslation';

export const HelpAndDocsButton: React.FC<FlexProps> = ({ gap }) => {
	const { t: translate } = useTranslation('sidebar');

	return (
		<Flex direction="column" gap={gap}>
			<Link
				as={NextLink}
				fontSize="sm"
				href={navigationPaths.help}
				_hover={{
					textDecoration: 'none',
					opacity: 0.8,
				}}
				pl={{ md: '4', lg: '2', xl: '2' }}
			>
				{translate('help')}
			</Link>
			<Link
				as={NextLink}
				fontSize="sm"
				href={navigationPaths.docs}
				_hover={{
					textDecoration: 'none',
					opacity: 0.8,
				}}
				pl={{ md: '4', lg: '2', xl: '2' }}
			>
				{translate('docs')}
			</Link>
		</Flex>
	);
};

export default HelpAndDocsButton;

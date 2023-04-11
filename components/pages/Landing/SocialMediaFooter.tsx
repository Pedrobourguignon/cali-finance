import { Flex, Text, Icon } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React from 'react';
import { ISocialMediaFooter } from 'types';

export const SocialMediaFooter: React.FC<ISocialMediaFooter> = ({
	name,
	icon,
	url,
}) => {
	const theme = usePicasso();

	return (
		<Flex
			align="center"
			direction="column"
			gap="3"
			onClick={() => window.open(`${url}`)}
			cursor="pointer"
		>
			<Icon as={icon} color={theme.branding.socialIcons} boxSize="12" />
			<Text color={theme.branding.socialIcons}>{name}</Text>
		</Flex>
	);
};

export default SocialMediaFooter;

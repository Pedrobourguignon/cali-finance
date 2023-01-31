import { Flex } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { ActiveTeamsCard, InfosBanner, LifeIsEasier } from 'components';

export const ActiveTeamsBar = () => {
	const theme = usePicasso();
	return (
		<InfosBanner>
			<Flex
				bg={theme.bg.black}
				zIndex="docked"
				gap="20"
				p="4"
				direction="column"
				borderRadius="base"
			>
				<ActiveTeamsCard />
				<LifeIsEasier />
			</Flex>
		</InfosBanner>
	);
};

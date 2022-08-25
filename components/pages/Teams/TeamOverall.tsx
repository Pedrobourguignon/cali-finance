import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { CostPerMonthCard, TeamBalanceCard, TimeLeftCard } from 'components';
import { useTeams } from 'hooks';
import { usePicasso } from 'hooks/usePicasso';
import { BsThreeDotsVertical } from 'react-icons/bs';

export const TeamOverall: React.FC = () => {
	const theme = usePicasso();
	const { teams } = useTeams();

	return (
		<Flex
			h="max-content"
			minW={{ base: '96', sm: '22rem', md: '25rem', xl: '30rem' }}
			bg={theme.bg.primary}
			borderRadius="12"
			flexDirection="column"
		>
			<Flex
				py="4"
				px="6"
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Flex>
					<Text fontSize="xl" whiteSpace="nowrap">
						{teams[0].name}
					</Text>
				</Flex>
				<Flex>
					<Button bg="none">
						<Icon as={BsThreeDotsVertical} />
					</Button>
				</Flex>
			</Flex>
			<Flex
				py="6"
				px="6"
				flexDirection={{
					base: 'column',
					sm: 'column',
					md: 'column',
					xl: 'row',
				}}
				gap="6"
				justify="center"
				align="center"
			>
				<TeamBalanceCard />
				<TimeLeftCard />
				<CostPerMonthCard />
			</Flex>
		</Flex>
	);
};

export default TeamOverall;

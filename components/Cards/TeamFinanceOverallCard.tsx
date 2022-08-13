import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import {
	CostPerMonthCard,
	TeamBalanceCard,
	TimeLeftCard,
} from 'components/Cards';
import { usePicasso } from 'hooks/usePicasso';
import { BsThreeDotsVertical } from 'react-icons/bs';

export const TeamFinanceOverallCard = () => {
	const theme = usePicasso();
	return (
		<Flex
			h={theme.boxSize.teamTableH}
			w={theme.boxSize.teamFinanceOverallW}
			ml="32"
			bg={theme.bg.primary}
			borderRadius="12"
			flexDirection="column"
		>
			<Flex
				mt="4"
				ml="6"
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Flex>
					<Text fontSize="xl" whiteSpace="nowrap">
						Celebrities Team
					</Text>
				</Flex>
				<Flex>
					<Button bg="none">
						<Icon as={BsThreeDotsVertical} />
					</Button>
				</Flex>
			</Flex>
			<Flex mt="6">
				<TeamBalanceCard />
				<TimeLeftCard />
				<CostPerMonthCard />
			</Flex>
		</Flex>
	);
};

export default TeamFinanceOverallCard;

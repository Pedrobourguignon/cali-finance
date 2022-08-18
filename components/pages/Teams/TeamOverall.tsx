import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import {
	CostPerMonthCard,
	TeamBalanceCard,
	TimeLeftCard,
} from 'components/Cards';
import { usePicasso } from 'hooks/usePicasso';
import useTranslation from 'next-translate/useTranslation';
import { BsThreeDotsVertical } from 'react-icons/bs';

export const TeamOverall = () => {
	const theme = usePicasso();
	const { t: trans } = useTranslation('common');

	return (
		<Flex
			minH="486px"
			minW="520px"
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
						{trans('teamName')}
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

export default TeamOverall;

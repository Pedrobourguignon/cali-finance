import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { CostPerMonthCard, TeamBalanceCard, TimeLeftCard } from 'components';
import { usePicasso } from 'hooks/usePicasso';
import useTranslation from 'next-translate/useTranslation';
import { BsThreeDotsVertical } from 'react-icons/bs';

export const TeamOverall: React.FC = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('common');

	return (
		<Flex
			h="max-content"
			w={{
				base: '72',
				sm: '29rem',
				md: '35rem',
				lg: 'max-content',
				xl: 'max-content',
			}}
			bg={theme.bg.primary}
			borderRadius="12"
			flexDirection="column"
			minW="max-content"
			mb="8"
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
						{translate('teamOverall.teamName')}
					</Text>
				</Flex>
				<Flex>
					<Button bg="none">
						<Icon as={BsThreeDotsVertical} />
					</Button>
				</Flex>
			</Flex>
			<Flex
				p="6"
				gap="6"
				flexDirection={{
					base: 'column',
					sm: 'column',
					md: 'row',
					xl: 'row',
				}}
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

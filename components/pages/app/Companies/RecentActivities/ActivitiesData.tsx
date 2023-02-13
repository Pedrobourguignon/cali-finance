import { Flex, Img, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';
import { IActivities } from 'types';

interface IActivitiesData {
	activities: IActivities;
}

export const ActivitiesData: React.FC<IActivitiesData> = ({ activities }) => {
	const { t: translate } = useTranslation('companies');
	const handleIcon = () => {
		if (activities.type === 'Withdrawal') return '/icons/withdrawal.svg';
		if (activities.type === 'Deposit') return '/icons/deposit.svg';
		if (activities.type === 'Added to Sales Team') return '/icons/add-user.svg';

		return '/icons/team-created.svg';
	};

	const getStatusColor = () => {
		if (activities.status === translate('completed')) return 'green.400';
		if (activities.status === translate('processing')) return 'gray.400';
		return 'red.400';
	};

	const renderStatus = useMemo(() => {
		if (activities.type === 'Withdrawal' || activities.type === 'Deposit') {
			return (
				<Flex direction="column" align="end" w="20">
					<Flex
						flexDir="row"
						fontSize="sm"
						fontWeight="normal"
						gap={{ md: '1', '2xl': '2' }}
					>
						<Text>{activities.value.toLocaleString('en-US')}</Text>
						<Text>{activities.coin}</Text>
					</Flex>
					<Text fontSize="xs" color={getStatusColor()}>
						{translate(activities.status)}
					</Text>
				</Flex>
			);
		}
		return <Flex w="20" />;
	}, [activities]);

	return (
		<Flex
			align="center"
			px={{ md: '2', lg: '3' }}
			py="1"
			bg="gray.50"
			borderRadius="base"
			justify="space-between"
		>
			<Text
				h="max-content"
				fontSize="sm"
				fontWeight="normal"
				w={{ md: '24', lg: '36' }}
				whiteSpace="nowrap"
			>
				{activities.name}
			</Text>
			<Flex align="center" gap="2">
				<Img src={handleIcon()} boxSize="4" />
				<Flex direction="column">
					<Text fontSize="sm" fontWeight="normal">
						{activities.type === 'Team Created'
							? translate('teamCreated')
							: translate(activities.type.toLowerCase())}
					</Text>
					<Text color="gray.500" fontSize="xs" whiteSpace="nowrap">
						{activities.date}
					</Text>
				</Flex>
			</Flex>
			{renderStatus}
		</Flex>
	);
};

import { Flex, Img, Text } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';
import { IActivities } from 'types';

interface IActivitiesData {
	activities: IActivities;
}

export const ActivitiesData: React.FC<IActivitiesData> = ({ activities }) => {
	const { t: translate } = useTranslation('organizations');
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
						fontSize={{ md: 'xs', xl: 'sm', '2xl': 'md' }}
						fontWeight="normal"
						gap={{ md: '1', '2xl': '2' }}
					>
						<Text>{activities.value.toLocaleString('en-US')}</Text>
						<Text>{activities.coin}</Text>
					</Flex>
					<Text fontSize={{ md: 'xs', '2xl': 'sm' }} color={getStatusColor()}>
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
			px={{ md: '2', lg: '5' }}
			py={{ md: '1', lg: '2', xl: '3' }}
			bg="gray.50"
			borderRadius="base"
			justify="space-between"
		>
			<Text
				fontSize={{ md: 'xs', xl: 'sm', '2xl': 'md' }}
				fontWeight="normal"
				w={{ md: '24', lg: '36' }}
			>
				{activities.name}
			</Text>
			<Flex align="center" gap="2">
				<Img src={handleIcon()} boxSize={{ md: '4', '2xl': '6' }} />
				<Flex direction="column">
					<Text
						fontSize={{ md: 'xs', xl: 'sm', '2xl': 'md' }}
						fontWeight="normal"
					>
						{activities.type === 'Team Created'
							? translate('teamCreated')
							: translate(activities.type.toLowerCase())}
					</Text>
					<Text
						color="gray.500"
						fontSize={{ md: 'xs', '2xl': 'sm' }}
						w={{ md: '24', '2xl': '28' }}
					>
						{activities.date}
					</Text>
				</Flex>
			</Flex>
			{renderStatus}
		</Flex>
	);
};

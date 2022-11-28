import { Flex, Img, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { IActivities } from 'types';

interface IActivitiesData {
	activities: IActivities;
}

export const ActivitiesData: React.FC<IActivitiesData> = ({ activities }) => {
	const handleIcon = (activitieType: string) => {
		let icon = '';
		if (activitieType === 'Withdrawal') {
			icon = '/icons/withdrawal.svg';
		} else if (activitieType === 'Deposit') {
			icon = '/icons/deposit.svg';
		} else if (activitieType === 'Added to Sales Team') {
			icon = '/icons/add-user.svg';
		} else {
			icon = '/icons/team-created.svg';
		}
		return icon;
	};

	const renderStatus = useMemo(() => {
		if (activities.type === 'Withdrawal' || activities.type === 'Deposit') {
			return (
				<Flex direction="column" align="end" w="20">
					<Flex flexDir="row" fontSize="sm" fontWeight="normal" gap="1">
						<Text>{activities.value.toLocaleString('en-US')}</Text>
						<Text>{activities.coin}</Text>
					</Flex>
					<Text
						fontSize="xs"
						color={
							// eslint-disable-next-line no-nested-ternary
							activities.status === 'Completed'
								? 'green.400'
								: activities.status === 'Processing'
								? 'gray.400'
								: 'red.400'
						}
					>
						{activities.status}
					</Text>
				</Flex>
			);
		}
		return <Flex w="20" />;
	}, [activities]);

	return (
		<Flex
			align="center"
			px="5"
			py="3"
			bg="gray.50"
			borderRadius="base"
			gap="32"
			justify="space-between"
		>
			<Text fontSize="sm" fontWeight="normal" w="36">
				{activities.name}
			</Text>
			<Flex align="center" gap="2">
				<Img src={handleIcon(activities.type)} boxSize="4" />
				<Flex direction="column">
					<Text fontSize="sm" fontWeight="normal">
						{activities.type}
					</Text>
					<Text color="gray.500" fontSize="xs" w="24">
						{activities.date}
					</Text>
				</Flex>
			</Flex>
			{renderStatus}
		</Flex>
	);
};

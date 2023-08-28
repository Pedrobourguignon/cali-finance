import { useMediaQuery } from '@chakra-ui/react';
import { HistoryComponent, HistoryComponentMobile } from 'components';
import { AuthProvider, ProfileProvider } from 'contexts';
import { useProfile } from 'hooks';

import React from 'react';
import { useQuery } from 'react-query';

export const HistoryContainer = () => {
	const { getUserActivities } = useProfile();

	const { data: historyNotifications } = useQuery('all-activities', () =>
		getUserActivities(999)
	);
	const [isLargerThan767] = useMediaQuery('(min-width: 767px)', {
		fallback: true,
	});

	return (
		<ProfileProvider>
			<AuthProvider>
				{isLargerThan767 ? (
					<HistoryComponent history={historyNotifications} />
				) : (
					<HistoryComponentMobile history={historyNotifications} />
				)}
			</AuthProvider>
		</ProfileProvider>
	);
};

export default HistoryContainer;

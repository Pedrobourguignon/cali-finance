import { Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { AppLayout, OrganizationWhiteBackground } from 'layouts';
import {
	CoinCard,
	DepositOrWithdrawBanner,
	HistoryDashboard,
	OrganizationsHeader,
} from 'components';
import { layoutLimit } from 'utils';
import { ICoin } from 'types';
import useTranslation from 'next-translate/useTranslation';

const coinCard: ICoin[] = [
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: 0.6,
	},
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: 0,
	},
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: 0.6,
	},
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: 0.6,
	},
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: 0.6,
	},
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: -0.6,
	},
	{
		icon: '/icons/tether.svg',
		name: 'USDT',
		value: '$1,00',
		variation: 0,
	},
];

export const FundsPageComponent = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('organization-overall');

	return (
		<AppLayout right={<DepositOrWithdrawBanner />}>
			<OrganizationWhiteBackground />
			<Flex
				color="black"
				pt="6"
				zIndex="docked"
				direction="column"
				align="start"
				maxW={layoutLimit}
			>
				<OrganizationsHeader />
			</Flex>
			<Flex
				color={theme.text.primary}
				px="6"
				py="12"
				maxW={layoutLimit}
				direction="column"
				gap="10"
			>
				<Flex direction="column" gap="4">
					<Flex fontWeight="medium" gap="1">
						<Text>{translate('coins')}</Text>
					</Flex>

					<Grid gap="4" w="full" templateColumns="repeat(6, 1fr)">
						{coinCard.map((coin, index) => (
							<GridItem key={+index} w="max-content">
								<CoinCard
									coin={coin}
									borderColor="gray.400"
									bg="white"
									color={theme.text.primary}
								/>
							</GridItem>
						))}
					</Grid>
				</Flex>
				<HistoryDashboard />
			</Flex>
		</AppLayout>
	);
};

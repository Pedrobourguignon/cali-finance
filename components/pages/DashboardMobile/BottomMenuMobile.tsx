import { Button, Flex, Icon, Link } from '@chakra-ui/react';
import {
	DashboardIcon,
	CompanyIcon,
	EditProfileIcon,
	HistoryIcon,
	MoreSquareIcon,
	afterCssValues,
	beforeCssValues,
} from 'components';
import { usePath, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import { navigationPaths } from 'utils';

interface IMenuItem {
	icon: typeof Icon;
	route: string;
	option: () => void;
}

export const BottomMenuMobile = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('sidebar');
	const { isSamePath } = usePath();
	const menuOptions: IMenuItem[] = [
		{
			icon: DashboardIcon,
			route: navigationPaths.dashboard.home,
			option: translate('dashboard'),
		},
		{
			icon: CompanyIcon,
			route: navigationPaths.dashboard.companies.home,
			option: translate('companies'),
		},

		{
			icon: EditProfileIcon,
			route: navigationPaths.dashboard.editProfile,
			option: translate('editProfile'),
		},
		{
			icon: HistoryIcon,
			route: navigationPaths.dashboard.history,
			option: translate('history'),
		},
	];

	return (
		<Flex
			display={{ base: 'flex', sm: 'none' }}
			h="14"
			w="100%"
			justify="space-between"
			px="8"
			align="center"
			top="100%"
			bg={theme.bg.primary}
		>
			{menuOptions.map((menuOption, index) => {
				const comparedPath = isSamePath(menuOption.route);
				return (
					<Flex
						key={+index}
						rounded={comparedPath ? 'full' : 'none'}
						boxSize={comparedPath ? '16' : '6'}
						transform={comparedPath ? 'translateY(-30%)' : ''}
						align="center"
						justify="center"
						borderWidth={comparedPath ? '0.4rem' : '0'}
						borderColor="white"
						bg={theme.bg.primary}
						_before={comparedPath ? beforeCssValues : {}}
						_after={comparedPath ? afterCssValues : {}}
					>
						<Link as={NextLink} href={menuOption.route}>
							<Icon
								as={menuOption.icon}
								boxSize="6"
								color={comparedPath ? theme.branding.blue : 'white'}
							/>
						</Link>
					</Flex>
				);
			})}
			<Button bg="none" p="0">
				<Icon as={MoreSquareIcon} boxSize="6" />
			</Button>
		</Flex>
	);
};

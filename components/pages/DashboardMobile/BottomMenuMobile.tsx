import { Flex, Icon, Link, useDisclosure } from '@chakra-ui/react';
import {
	DashboardIcon,
	CompanyIcon,
	EditProfileIcon,
	HistoryIcon,
	afterCssValues,
	beforeCssValues,
	MoreOptionsMobilePopover,
} from 'components';
import { usePath, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import { navigationPaths } from 'utils';

interface IMenuItem {
	icon?: typeof Icon;
	route: string;
	option?: () => void;
}

export const BottomMenuMobile = () => {
	const theme = usePicasso();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { t: translate } = useTranslation('sidebar');
	const { isSamePath, includesPath } = usePath();
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
				const comparedPath = includesPath(menuOption.route);
				const moreOptionsIsOpen = isOpen
					? isSamePath('')
					: includesPath(menuOption.route);
				return (
					<Flex
						key={+index}
						rounded={comparedPath && moreOptionsIsOpen ? 'full' : 'none'}
						boxSize={comparedPath && moreOptionsIsOpen ? '16' : '6'}
						transform={
							comparedPath && moreOptionsIsOpen ? 'translateY(-30%)' : ''
						}
						align="center"
						justify="center"
						borderWidth={comparedPath && moreOptionsIsOpen ? '0.4rem' : '0'}
						borderColor="white"
						bg={theme.bg.primary}
						_before={comparedPath && moreOptionsIsOpen ? beforeCssValues : {}}
						_after={comparedPath && moreOptionsIsOpen ? afterCssValues : {}}
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
			<Flex
				zIndex="100"
				rounded={isOpen ? 'full' : 'none'}
				boxSize={isOpen ? '16' : '6'}
				transform={isOpen ? 'translateY(-30%)' : ''}
				align="center"
				justify="center"
				borderWidth={isOpen ? '0.4rem' : '0'}
				borderColor="white"
				bg={theme.bg.primary}
				_before={isOpen ? beforeCssValues : {}}
				_after={isOpen ? afterCssValues : {}}
			>
				<Flex zIndex="10">
					<MoreOptionsMobilePopover
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};

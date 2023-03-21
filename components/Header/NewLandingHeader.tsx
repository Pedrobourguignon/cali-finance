import { Button, Flex, Img, Link, Text } from '@chakra-ui/react';
import { usePath, usePicasso } from 'hooks';
import { navigationPaths } from 'utils';
import NextLink from 'next/link';

interface IMenu {
	name: string;
	route: string;
}

const menuOptions: IMenu[] = [
	{
		name: 'About',
		route: navigationPaths.about,
	},
	{
		name: 'Pricing',
		route: navigationPaths.faq,
	},
	{
		name: 'FAQ',
		route: navigationPaths.docs,
	},
	{
		name: 'Contact Us',
		route: navigationPaths.docs,
	},
	{
		name: 'Docs',
		route: navigationPaths.docs,
	},
];
export const NewLandingHeader: React.FC = () => {
	const theme = usePicasso();
	const { isSamePath } = usePath();
	return (
		<Flex
			pt="4"
			pb="30"
			w="100%"
			justify={{ base: 'center', md: 'space-between' }}
			align="center"
			bg="transparent"
			px="24"
		>
			<Link href={navigationPaths.landing} as={NextLink}>
				<Img minH="7" src="/images/logo-cali.svg" />
			</Link>
			<Flex display={{ base: 'none', lg: 'flex' }} gap="6">
				{menuOptions.map((item, index) => {
					const comparedPath = isSamePath(item.route);
					return (
						<Link key={+index} href={item.route} as={NextLink}>
							<Text
								color={theme.text.black}
								fontWeight={comparedPath ? 'medium' : 'normal'}
								borderBottomColor={comparedPath ? theme.text.black : 'none'}
								borderBottomWidth={comparedPath ? '0.125rem' : 'none'}
								cursor="pointer"
							>
								{item.name}
							</Text>
						</Link>
					);
				})}
			</Flex>
			<Link
				href="https://califinance.ck.page/6455cc2350"
				textDecoration="none"
				_hover={{ textDecoration: 'none' }}
				as={NextLink}
				target="_blank"
			>
				<Button
					_hover={{ bg: 'white', textDecor: 'none' }}
					_focus={{
						border: '2px solid white',
						color: 'white',
						bgColor: 'transparent',
					}}
					_active={{ color: 'black' }}
					_focusVisible={{}}
					_focusWithin={{}}
					display={{ base: 'none', md: 'flex' }}
					borderRadius="base"
					bg={theme.text.black}
					border="2px solid"
					borderColor="transparent"
					color={theme.text.white}
					px="12"
					py="3"
					fontSize="md"
					fontWeight="normal"
					textDecoration="none"
				>
					Launch App
				</Button>
			</Link>
		</Flex>
	);
};

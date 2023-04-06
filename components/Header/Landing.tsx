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
		name: 'FAQ',
		route: navigationPaths.faq,
	},
	{
		name: 'Docs',
		route: navigationPaths.docs,
	},
];
export const LandingHeader: React.FC = () => {
	const theme = usePicasso();
	const { isSamePath } = usePath();
	return (
		<Flex
			h="20"
			w="100%"
			justify={{ base: 'center', md: 'space-between' }}
			align="center"
			bg={theme.text.black}
			px="6"
			position="absolute"
		>
			<Link href={navigationPaths.landing} as={NextLink}>
				<Img minH="10" src="/images/cali-logo-with-text.svg" />
			</Link>
			<Flex display={{ base: 'none', lg: 'flex' }} gap="6">
				{menuOptions.map((item, index) => {
					const comparedPath = isSamePath(item.route);
					return (
						<Link key={+index} href={item.route} as={NextLink}>
							<Text
								borderBottomColor={comparedPath ? 'white' : 'none'}
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
					_active={{ color: 'white' }}
					_focusVisible={{}}
					_focusWithin={{}}
					display={{ base: 'none', md: 'flex' }}
					borderRadius="sm"
					bg="white"
					border="2px solid"
					borderColor="transparent"
					color={theme.text.black}
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

import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { usePath, usePicasso } from 'hooks';
import NextLink from 'next/link';

interface IMenu {
	name: string;
	route: string;
}

const menuOptions: IMenu[] = [
	{
		name: 'About',
		route: '/',
	},
	{
		name: 'FAQ',
		route: '/faq',
	},
	{
		name: 'Docs',
		route: '/docs',
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
			<NextLink href="/">
				<Img minH="10" src="/images/cali-logo-with-text.svg" />
			</NextLink>
			<Flex gap="6">
				{menuOptions.map((item, index) => {
					const comparedPath = isSamePath(item.route);
					return (
						<NextLink key={index} href={item.route}>
							<Text
								borderBottomColor={comparedPath ? 'white' : 'none'}
								borderBottomWidth={comparedPath ? '0.125rem' : 'none'}
							>
								{item.name}
							</Text>
						</NextLink>
					);
				})}
			</Flex>
			<Button
				_hover={{ bg: 'white' }}
				_focus={{ border: '2px solid white', color: 'white' }}
				display={{ base: 'none', md: 'flex' }}
				borderRadius="sm"
				bg="white"
				color={theme.text.black}
				px="12"
				py="3"
				fontSize="md"
				fontWeight="normal"
			>
				Launch App
			</Button>
		</Flex>
	);
};

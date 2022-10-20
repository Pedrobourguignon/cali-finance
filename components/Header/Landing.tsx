import { Button, Flex, Img, Text } from '@chakra-ui/react';
import { usePath, usePicasso } from 'hooks';
import NextLink from 'next/link';
import { navigationPaths } from 'utils';

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
			<NextLink href={navigationPaths.landing}>
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
								cursor="pointer"
							>
								{item.name}
							</Text>
						</NextLink>
					);
				})}
			</Flex>
			{/* <NextLink href={navigationPaths.dashboard.home}> */}
			<Button
				_hover={{ bg: 'white' }}
				_focus={{
					border: '2px solid white',
					color: 'white',
					bgColor: 'transparent',
				}}
				_active={{ color: 'black' }}
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
			>
				Launch App
			</Button>
			{/* </NextLink> */}
		</Flex>
	);
};

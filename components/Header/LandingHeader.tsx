import {
	Button,
	Flex,
	Img,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import Link from 'next/link';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { usePath, usePicasso } from 'hooks';
import { SocialMediaButton } from 'components';

interface IMenuOptions {
	link: string;
	title: string;
}

const menuOptions: IMenuOptions[] = [
	{ title: 'Home', link: '/' },
	{ title: 'Roadmap', link: '/roadmap' },
	{ title: 'Docs', link: '/docs' },
	{ title: 'Contact', link: '/contact' },
];

export const LandingHeader = () => {
	const { isSamePath } = usePath();
	const theme = usePicasso();

	return (
		<Flex justify="space-between" px="12" w="100%" minH="20" align="center">
			<Flex>
				<Link href="/">
					<Img src="/images/cali-logo-with-text.svg" w="32" h="8" />
				</Link>
			</Flex>
			<Flex
				w="sm"
				justify="space-between"
				display={{ base: 'none', lg: 'flex' }}
			>
				{menuOptions.map((item, index) => (
					<Link key={item.title + Number(index)} href={item.link}>
						<Button
							bg="transparent"
							borderColor={
								isSamePath(item.link) ? theme.branding.red : 'transparent'
							}
							borderBottomWidth="0.2rem"
							borderStyle="solid"
							borderRadius="0"
							_hover={{
								borderBottom: '0.2rem',
								borderStyle: 'solid',
								borderColor: theme.branding.red,
							}}
						>
							{item.title}
						</Button>
					</Link>
				))}
			</Flex>
			<Flex display={{ base: 'none', lg: 'flex' }} gap="5">
				<SocialMediaButton media="discord" />
				<SocialMediaButton media="twitter" />
			</Flex>
			<Flex display={{ base: 'flex', lg: 'none' }}>
				<Menu autoSelect={false} closeOnBlur>
					{({ isOpen }) => (
						<>
							<MenuButton isActive={isOpen} as={Button}>
								{isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
							</MenuButton>
							<MenuList>
								{menuOptions.map((item, index) => (
									<Link href={item.link} key={+index}>
										<MenuItem key={item.title + Number(index)}>
											{item.title}
										</MenuItem>
									</Link>
								))}
							</MenuList>
						</>
					)}
				</Menu>
			</Flex>
		</Flex>
	);
};

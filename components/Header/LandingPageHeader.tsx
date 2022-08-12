import {
	Button,
	Flex,
	Icon,
	Img,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

export const LandingPageHeader = () => {
	const menuOptions = ['Home', 'Roadmap', 'Docs', 'Contact'];
	return (
		<Flex
			justify="space-between"
			px="12"
			w="100%"
			minH="20"
			align="center"
			position="absolute"
		>
			<Flex>
				<NextLink href="/">
					<Img src="/images/cali-logo-with-text.svg" w="32" h="8" />
				</NextLink>
			</Flex>
			<Flex
				w="sm"
				justify="space-between"
				display={{ base: 'none', lg: 'flex' }}
			>
				{menuOptions.map((item, index) => (
					<NextLink key={item + Number(index)} href="/">
						{item}
					</NextLink>
				))}
			</Flex>
			<Flex display={{ base: 'none', lg: 'flex' }}>
				<Flex
					w="10"
					h="10"
					bg="whiteAlpha.50"
					borderRadius="full"
					justify="center"
					align="center"
				>
					<NextLink href="/">
						<Icon as={FaDiscord} boxSize="6" />
					</NextLink>
				</Flex>
				<Flex
					ml="5"
					w="10"
					h="10"
					bg="whiteAlpha.50"
					borderRadius="full"
					justify="center"
					align="center"
				>
					<NextLink href="/">
						<Icon as={FaTwitter} boxSize="6" />
					</NextLink>
				</Flex>
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
									<MenuItem key={item + Number(index)}>
										<NextLink href="/">{item}</NextLink>
									</MenuItem>
								))}
							</MenuList>
						</>
					)}
				</Menu>
			</Flex>
		</Flex>
	);
};

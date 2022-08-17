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

interface IMenuItem {
	route: string;
	option: string;
}

const menuOptions: IMenuItem[] = [
	{
		route: '/app',
		option: 'Home',
	},
	{
		route: '/app/teams',
		option: 'Teams',
	},
	{
		route: '/app/swap',
		option: 'Swap',
	},
];

export const SandwichMenu = () => (
	<Flex direction="row" gap="10">
		<Flex alignItems="center">
			<Link href="/">
				<Img src="/images/cali-logo.svg" minW="16" minH="10" cursor="pointer" />
			</Link>
		</Flex>
		<Flex>
			<Menu autoSelect={false} closeOnBlur>
				{({ isOpen }) => (
					<>
						<MenuButton isActive={isOpen} as={Button}>
							{isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
						</MenuButton>
						<MenuList>
							{menuOptions.map((item, index) => (
								<Link href={item.route} key={+index}>
									<MenuItem>{item.option}</MenuItem>
								</Link>
							))}
						</MenuList>
					</>
				)}
			</Menu>
		</Flex>
	</Flex>
);

export default SandwichMenu;

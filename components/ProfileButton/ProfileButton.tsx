import {
	Flex,
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Img,
} from '@chakra-ui/react'
import { IoChevronDownOutline } from 'react-icons/io5'
import { usePicasso } from '../../hooks/usePicasso'

const ProfileButton: React.FC = () => {
	const theme = usePicasso()

	return (
		<Menu>
			<Button
				as={Button}
				rightIcon={<IoChevronDownOutline />}
				bg="none"
				boxShadow={theme.shadow.blue}
				borderRadius="20"
			>
				<Img src="/images/bradley.svg" boxSize="8" mr="2" p="0.5" />
				Bradley
			</Button>
			<MenuList bg="none">
				<MenuItem>Download</MenuItem>
			</MenuList>
		</Menu>
		// </Button>
	)
}

export default ProfileButton

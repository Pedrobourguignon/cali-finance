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

const ProfileButton = () => {
	const theme = usePicasso()

	return (
		// <Button w="36" h="10" borderRadius="20">

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

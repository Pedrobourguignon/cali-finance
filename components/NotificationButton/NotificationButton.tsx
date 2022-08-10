import { Button, Icon } from '@chakra-ui/react'
import { AiOutlineBell } from 'react-icons/ai'

const NotificationButton = () => {
	return (
		<Button borderRadius="30" boxSize="10" bg="gray.800">
			<Icon as={AiOutlineBell} boxSize="4" color="gray.500" />
		</Button>
	)
}

export default NotificationButton

import { Button, Icon } from '@chakra-ui/react'
import { usePicasso } from 'hooks/usePicasso'
import { AiOutlineBell } from 'react-icons/ai'

const NotificationButton: React.FC = () => {
	const theme = usePicasso()
	return (
		<Button borderRadius="30" boxSize="10" bg={theme.bg.container}>
			<Icon as={AiOutlineBell} boxSize="4" color="gray.500" />
		</Button>
	)
}

export default NotificationButton

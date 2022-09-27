import { Button, Icon } from '@chakra-ui/react';
import { usePicasso } from 'hooks/usePicasso';
import { VscBell } from 'react-icons/vsc';

export const NotificationButton: React.FC = () => (
	<Button borderRadius="30" bg="transparent" mt="4">
		<Icon as={VscBell} boxSize="6" color="gray.500" />
	</Button>
);

export default NotificationButton;

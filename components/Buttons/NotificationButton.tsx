import { Button, Icon } from '@chakra-ui/react';
import { VscBell } from 'react-icons/vsc';

export const NotificationButton: React.FC = () => (
	<Button bg="transparent">
		<Icon as={VscBell} boxSize="6" color="gray.500" />
	</Button>
);

export default NotificationButton;

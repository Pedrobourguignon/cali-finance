import { Button } from '@chakra-ui/react';
import { IoIosArrowBack } from 'react-icons/io';

interface IButton {
	onClick: () => void;
}
export const BackToTeams: React.FC<IButton> = ({ onClick }) => (
	<Button
		px="0"
		color="gray.500"
		leftIcon={<IoIosArrowBack />}
		onClick={onClick}
		fontSize="sm"
		lineHeight="6"
		fontWeight="medium"
		p="0"
	>
		Back to All Teams
	</Button>
);

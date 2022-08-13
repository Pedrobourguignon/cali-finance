import {
	Button,
	Menu,
	MenuItem,
	MenuList,
	Img,
	Skeleton,
	SkeletonCircle,
} from '@chakra-ui/react';
import { useProfile } from 'hooks';
import { IoChevronDownOutline } from 'react-icons/io5';
import { usePicasso } from '../../hooks/usePicasso';

export const ProfileButton: React.FC = () => {
	const { name, picture, isLoading } = useProfile();
	const theme = usePicasso();

	return (
		<Menu>
			<Button
				as={Button}
				rightIcon={<IoChevronDownOutline />}
				bg="none"
				boxShadow={theme.shadow.blue}
				borderRadius="20"
				display="flex"
				gap="2"
			>
				<SkeletonCircle isLoaded={!isLoading}>
					<Img
						src={picture}
						borderRadius="full"
						boxSize="8"
						p="0.5"
						objectFit="cover"
					/>
				</SkeletonCircle>
				<Skeleton isLoaded={!isLoading} w="12">
					{name}
				</Skeleton>
			</Button>
			<MenuList bg="none">
				<MenuItem>Download</MenuItem>
			</MenuList>
		</Menu>
		// </Button>
	);
};

export default ProfileButton;

import {
	Menu,
	MenuItem,
	MenuList,
	Img,
	Skeleton,
	SkeletonCircle,
	MenuButton,
	Button,
	Flex,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverArrow,
	PopoverCloseButton,
	PopoverHeader,
	PopoverBody,
	Switch,
	Icon,
	Divider,
} from '@chakra-ui/react';
import { useProfile } from 'hooks';
import { IoChevronDownOutline } from 'react-icons/io5';
import { usePicasso } from '../../../hooks/usePicasso';
import { LogoutButton } from './LogoutButton';
import { ThemeButton } from './ThemeButton';

export const ProfilePopover: React.FC = () => {
	const { name, picture, isLoading } = useProfile();
	const theme = usePicasso();

	return (
		<Popover>
			<PopoverTrigger>
				<Button
					rightIcon={<IoChevronDownOutline />}
					bg="none"
					boxShadow={theme.shadow.blue}
					borderRadius="20"
					w="max-content"
					px="2.5"
					gap="2"
				>
					<Flex flexDir="row" align="center" gap="2">
						<SkeletonCircle isLoaded={!isLoading}>
							<Img
								src={picture}
								borderRadius="full"
								boxSize="8"
								objectFit="cover"
							/>
						</SkeletonCircle>
						<Skeleton isLoaded={!isLoading} w="12">
							{name}
						</Skeleton>
					</Flex>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				borderColor="transparent"
				w="max-content"
				bgColor={theme.bg.primary}
			>
				<PopoverBody display="flex" flexDir="column" alignItems="flex-start">
					<ThemeButton />
					<Divider />
					<LogoutButton />
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};

export default ProfilePopover;

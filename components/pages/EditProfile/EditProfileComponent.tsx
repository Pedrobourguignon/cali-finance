import {
	Avatar,
	Button,
	Flex,
	FormControl,
	Input,
	Text,
	TextProps,
	useDisclosure,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editProfileSchema } from 'utils';
import useTranslation from 'next-translate/useTranslation';
import { ImageUploaderModal } from 'components';

interface IEditProfile {
	name: string;
	type: string;
	email: string;
	description?: string;
}

export const EditProfileComponent = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('edit-profile');
	const { isOpen, onOpen, onClose } = useDisclosure();

	const labelStyle: TextProps = {
		color: 'black',
		fontSize: 'sm',
		fontWeight: 'medium',
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IEditProfile>({
		resolver: yupResolver(editProfileSchema),
	});

	const handleEditProfile = (newDataOfProfile: IEditProfile) => {
		console.log(newDataOfProfile);
	};

	return (
		<Flex
			bg="white"
			w="full"
			h="95vh"
			m="auto"
			borderLeft="0.25rem solid"
			borderColor={theme.branding.blue}
			borderLeftRadius="sm"
			gap="4"
			direction="column"
		>
			<ImageUploaderModal isOpen={isOpen} onClose={onClose} />
			<Flex>
				<Text
					fontSize="xl"
					color="#121212"
					lineHeight="tall"
					fontWeight="500"
					pl="7"
					pt="6"
				>
					{translate('editProfile')}
				</Text>
			</Flex>
			<Flex justify="center" pt="7" direction="column" align="center" gap="5">
				<Avatar src="https://bit.ly/broken-link" boxSize="24" />
				<Button
					fontSize="xs"
					bg="#121212"
					borderRadius="sm"
					px="2"
					h="max-content"
					py="1"
					_hover={{}}
					_focus={{ bg: '#121212' }}
					onClick={onOpen}
				>
					{translate('editProfileImage')}
				</Button>
			</Flex>
			<Flex
				bg="#EDF2F7"
				h="full"
				direction="column"
				align="center"
				bgImage="/images/calipattern.png"
				bgRepeat="no-repeat"
				bgPosition="right bottom"
			>
				<form onSubmit={handleSubmit(handleEditProfile)}>
					<FormControl>
						<Flex direction="column" gap="8" pt="7">
							<Flex direction="column" gap="2">
								<Text {...labelStyle}>{translate('name')}</Text>
								<Input
									placeholder={translate('insertHere')}
									_placeholder={{ color: 'blackAlpha.500' }}
									bgColor="white"
									_hover={{}}
									borderColor={theme.bg.primary}
									pr="24"
									{...register('name')}
									color="black"
								/>
								<Text fontSize="xs" color="red" position="absolute" top="100%">
									{errors.name?.message}
								</Text>
							</Flex>
							<Flex direction="column" gap="2">
								<Text {...labelStyle}>{translate('yourBestEmail')}</Text>
								<Input
									placeholder={translate('exampleEmail')}
									_placeholder={{ color: 'blackAlpha.500' }}
									bgColor="white"
									_hover={{}}
									color="black"
									borderColor={theme.bg.primary}
									{...register('email')}
								/>
								<Text fontSize="xs" color="red" position="absolute" top="100%">
									{errors.email?.message}
								</Text>
							</Flex>
							<Button
								type="submit"
								px="28"
								bg="#121212"
								opacity="50%"
								_hover={{}}
								_focus={{ bg: '#121212' }}
								fontWeight="500"
								fontSize="md"
								borderRadius="sm"
							>
								{translate('saveChanges')}
							</Button>
						</Flex>
					</FormControl>
				</form>
			</Flex>
		</Flex>
	);
};

export default EditProfileComponent;

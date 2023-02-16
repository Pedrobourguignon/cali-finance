import {
	Button,
	Flex,
	FormControl,
	Img,
	Input,
	Text,
	TextProps,
	useDisclosure,
} from '@chakra-ui/react';
import { usePicasso, useProfile, useSchema } from 'hooks';
import React, { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { BlackButton, ImageUploaderModal } from 'components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';

interface IEditProfile {
	name: string;
	email: string;
	picture: string;
}

export const EditProfileComponent = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('edit-profile');
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { data: session } = useSession();
	const { editProfileSchema } = useSchema();

	const labelStyle: TextProps = {
		color: theme.text.primary,
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
	const {
		userProfile,
		setUserProfile,
		editedProfileInfo,
		setEditedProfileInfo,
	} = useProfile();
	const [editProfilePicture, setEditProfilePicture] = useState(
		userProfile.picture || ''
	);

	const handleEditProfile = () => {
		setUserProfile({
			name: editedProfileInfo.name,
			email: editedProfileInfo.email,
			picture: editedProfileInfo.picture,
			wallet: '0x6856...BF99',
		});
	};

	return (
		<>
			<ImageUploaderModal
				isOpen={isOpen}
				onClose={onClose}
				sendImage={setEditProfilePicture}
			/>
			<Flex direction="column">
				<Text
					fontSize="xl"
					color={theme.text.primary}
					lineHeight="tall"
					fontWeight="medium"
					pl="7"
					pt="6"
					zIndex="docked"
				>
					{translate('editProfile')}
				</Text>
				<Flex w="100%" bg="white" position="absolute" h="64" left="0" />
			</Flex>
			<Flex
				justify="center"
				direction="column"
				align="center"
				gap="4"
				pt="7"
				pb="6"
			>
				<Flex
					_hover={{ opacity: '80%' }}
					_active={{}}
					_focus={{}}
					borderRadius="full"
					onClick={session ? onOpen : undefined}
					zIndex="docked"
				>
					<Img
						src={
							editedProfileInfo.picture === ''
								? '/images/editImage.png'
								: editedProfileInfo.picture
						}
						boxSize="24"
						borderRadius="full"
						objectFit="cover"
					/>
				</Flex>
				<Button
					mt="4"
					fontSize={{ md: 'xs', '2xl': 'sm' }}
					bg={theme.text.primary}
					borderRadius="sm"
					px={{ md: '2', '2xl': '6' }}
					h="max-content"
					py="1"
					_hover={{}}
					_focus={{ bg: theme.text.primary }}
					onClick={onOpen}
					disabled={!session}
				>
					{translate('editProfileImage')}
				</Button>
			</Flex>
			<Flex direction="column" align="center" h="full" pt="6">
				<form onSubmit={handleSubmit(handleEditProfile)}>
					<FormControl>
						<Flex direction="column" gap="8" maxW="80">
							<Flex direction="column" gap="6">
								<Flex direction="column" gap="2">
									<Text {...labelStyle}>{translate('name')}</Text>
									<Input
										type="text"
										defaultValue={userProfile.name}
										borderRadius="base"
										placeholder={translate('insertHere')}
										borderColor={errors.name ? 'red' : theme.bg.primary}
										_placeholder={{
											color: 'blackAlpha.500',
											fontSize: 'sm',
										}}
										bgColor="white"
										_hover={{}}
										{...register('name')}
										color="black"
										h="max-content"
										py="1"
										disabled={!session}
										onChange={name => {
											setEditedProfileInfo(prevState => ({
												...prevState,
												name: name.target.value,
											}));
										}}
									/>
									<Text fontSize="xs" color="red">
										{errors.name?.message}
									</Text>
								</Flex>
								<Flex direction="column" gap="2">
									<Text {...labelStyle}>{translate('yourBestEmail')}</Text>
									<Input
										defaultValue={userProfile.email}
										placeholder={translate('exampleEmail')}
										_placeholder={{
											color: 'blackAlpha.500',
											fontSize: 'sm',
										}}
										bgColor="white"
										_hover={{}}
										color="black"
										borderColor={errors.email ? 'red' : theme.bg.primary}
										h="max-content"
										py="1"
										borderRadius="base"
										{...register('email')}
										disabled={!session}
										onChange={email => {
											setEditedProfileInfo(prevState => ({
												...prevState,
												email: email.target.value,
											}));
										}}
									/>
									<Text fontSize="xs" color="red">
										{errors.email?.message}
									</Text>
								</Flex>
							</Flex>
							<BlackButton
								px={{ md: '32', '2xl': '36' }}
								type="submit"
								fontSize="md"
								py="2.5"
								borderRadius="sm"
								disabled={
									editedProfileInfo.email === userProfile.email &&
									editedProfileInfo.name === userProfile.name &&
									editedProfileInfo.picture === userProfile.picture
								}
							>
								{translate('saveChanges')}
							</BlackButton>
						</Flex>
					</FormControl>
				</form>
			</Flex>
		</>
	);
};

export default EditProfileComponent;

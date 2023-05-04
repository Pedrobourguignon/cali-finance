/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	Button,
	Flex,
	FormControl,
	Img,
	Input,
	Text,
	TextProps,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { usePicasso, useProfile, useSchema } from 'hooks';
import React, { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { AlertToast, BlackButton, ImageUploaderModal } from 'components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { IUser } from 'types/interfaces/main-server/IUser';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getLogo } from 'utils';
import { useAccount } from 'wagmi';

interface IEditedInfo {
	name?: string;
	email?: string;
	picture?: string;
}

export const EditProfileComponent = () => {
	const { t: translate } = useTranslation('edit-profile');
	const { data: session } = useSession();
	const { updateProfile, getProfileData } = useProfile();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { editProfileSchema } = useSchema();
	const theme = usePicasso();
	const queryClient = useQueryClient();
	const toast = useToast();
	const { isConnected, address } = useAccount();

	const labelStyle: TextProps = {
		color: theme.text.primary,
		fontSize: 'sm',
		fontWeight: 'medium',
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUser>({
		resolver: yupResolver(editProfileSchema),
	});

	const { data: profileData } = useQuery(
		'profile-data',
		() => getProfileData(address),
		{
			enabled: !!isConnected,
		}
	);

	const { mutate } = useMutation(
		(editedProfileData: IUser) => updateProfile(editedProfileData),
		{
			onSuccess: () => {
				toast({
					position: 'top-right',
					render: () => (
						<AlertToast
							type="success"
							text="changesMadeWithSuccessfully"
							onClick={toast.closeAll}
						/>
					),
				});
				queryClient.invalidateQueries('profile-data');
			},
		}
	);

	const [editedProfileInfo, setEditedProfileInfo] = useState<IEditedInfo>(
		{} as IEditedInfo
	);

	const [editedProfilePicture, setEditedProfilePicture] = useState<
		string | null
	>('/images/editImage.png');

	useEffect(() => {
		setEditedProfileInfo({
			name: profileData?.name,
			email: profileData?.email,
			picture: profileData?.picture,
		});
		if (profileData?.picture) {
			setEditedProfilePicture(profileData.picture);
		}
	}, [profileData]);

	const handleEditProfile = () => {
		mutate({
			name: editedProfileInfo.name,
			email: editedProfileInfo.email,
			picture:
				editedProfilePicture! === '/images/editImage.png'
					? ''
					: editedProfilePicture!,
		});
	};

	const handleProfileImage = () => {
		if (editedProfilePicture === null) {
			return '/images/editImage.png';
		}
		if (editedProfilePicture === profileData?.picture) {
			return getLogo(editedProfilePicture);
		}
		return editedProfilePicture;
	};

	return (
		<>
			<ImageUploaderModal
				isOpen={isOpen}
				onClose={onClose}
				sendImage={setEditedProfilePicture}
			/>
			<Flex direction="column">
				<Text
					fontSize="xl"
					color={theme.text.primary}
					lineHeight="tall"
					fontWeight="medium"
					pl={{ base: '1', sm: '7' }}
					pt={{ base: '2', sm: '6' }}
					zIndex="docked"
				>
					{translate('editProfile')}
				</Text>
				<Flex
					w="100%"
					bg="white"
					position="absolute"
					h="64"
					left="0"
					display={{ base: 'none', sm: 'flex' }}
				/>
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
						src={handleProfileImage()}
						boxSize="24"
						borderRadius="full"
						objectFit="cover"
					/>
				</Flex>
				<Flex gap="4">
					<Button
						mt="4"
						fontSize={{ base: 'xs', '2xl': 'sm' }}
						bg={theme.text.primary}
						borderRadius="sm"
						px={{ base: '2', '2xl': '6' }}
						h="max-content"
						py="1"
						_hover={{}}
						_focus={{ bg: theme.text.primary }}
						onClick={onOpen}
						disabled={!session}
					>
						{translate('editProfileImage')}
					</Button>
					<Button
						mt="4"
						fontSize={{ base: 'xs', '2xl': 'sm' }}
						bg={theme.text.primary}
						borderRadius="sm"
						px={{ base: '2', '2xl': '6' }}
						h="max-content"
						py="1"
						_hover={{}}
						_focus={{ bg: theme.text.primary }}
						onClick={() => setEditedProfilePicture(null)}
						isDisabled={
							!session || editedProfilePicture === '/images/editImage.png'
						}
					>
						{translate('deleteImage')}
					</Button>
				</Flex>
			</Flex>
			<Flex
				direction="column"
				align={{ base: '', sm: 'center' }}
				h="full"
				pt="6"
				px={{ base: '1', sm: '0' }}
			>
				<form onSubmit={handleSubmit(handleEditProfile)}>
					<FormControl>
						<Flex direction="column" gap="8">
							<Flex direction="column" gap="6">
								<Flex direction="column" gap="2">
									<Text {...labelStyle}>{translate('name')}</Text>
									<Input
										defaultValue={profileData?.name}
										type="text"
										borderRadius="base"
										placeholder={translate('insertHere')}
										borderColor={errors.name ? 'red' : theme.bg.primary}
										_placeholder={{
											color: 'blackAlpha.500',
											fontSize: 'sm',
										}}
										bg="white"
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
										defaultValue={profileData?.email}
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
								isDisabled={
									editedProfileInfo.email === profileData?.email &&
									editedProfileInfo.name === profileData?.name &&
									editedProfileInfo.picture === profileData?.picture &&
									editedProfileInfo.picture === editedProfilePicture
								}
								_disabled={{ opacity: '50%', cursor: 'not-allowed' }}
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

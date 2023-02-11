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
	const { isConnected } = useProfile();
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
	const [editProfilePicture, setEditProfilePicture] = useState('');

	const handleEditProfile = (newDataOfProfile: IEditProfile) => {
		console.log(newDataOfProfile);
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
					bgImage={editProfilePicture}
					bgSize="cover"
					bgRepeat="no-repeat"
					_hover={{ opacity: '80%' }}
					_active={{}}
					_focus={{}}
					borderRadius="full"
					onClick={isConnected ? onOpen : undefined}
					zIndex="docked"
				>
					{editProfilePicture === '' && (
						<Img src="/images/editImage.png" boxSize="24" />
					)}
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
					disabled={!isConnected}
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
										borderRadius="base"
										placeholder={translate('insertHere')}
										_placeholder={{
											color: 'blackAlpha.500',
											fontSize: 'sm',
										}}
										bgColor="white"
										_hover={{}}
										borderColor={theme.bg.primary}
										{...register('name')}
										color="black"
										h="max-content"
										py="1"
										disabled={!isConnected}
									/>
									<Text fontSize="xs" color="red">
										{errors.name?.message}
									</Text>
								</Flex>
								<Flex direction="column" gap="2">
									<Text {...labelStyle}>{translate('yourBestEmail')}</Text>
									<Input
										placeholder={translate('exampleEmail')}
										_placeholder={{
											color: 'blackAlpha.500',
											fontSize: 'sm',
										}}
										bgColor="white"
										_hover={{}}
										color="black"
										borderColor={theme.bg.primary}
										h="max-content"
										py="1"
										borderRadius="base"
										{...register('email')}
										disabled={!isConnected}
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

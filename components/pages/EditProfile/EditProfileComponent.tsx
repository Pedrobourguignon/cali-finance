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
import { usePicasso, useProfile } from 'hooks';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ImageUploaderModal } from 'components';
import { OrganizationWhiteBackground } from 'layouts';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { limitSpecialCharacterRegex, nameRegex } from 'utils';
import * as yup from 'yup';

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
	const { userProfile } = useProfile();

	const editProfileSchema = yup.object().shape({
		name: yup
			.string()
			.required(translate('form.required'))
			.matches(nameRegex, translate('form.nameNumber'))
			.min(3, translate('form.nameMin')),
		email: yup
			.string()
			.lowercase()
			.required(translate('form.required'))
			.email(translate('form.invalidEmailFormat'))
			.matches(limitSpecialCharacterRegex, translate('form.emailContains')),
	});

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
		<>
			<ImageUploaderModal isOpen={isOpen} onClose={onClose} />
			<Flex>
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
				<OrganizationWhiteBackground />
			</Flex>
			<Flex justify="center" pt="7" direction="column" align="center" gap="5">
				<Button
					bgImage={userProfile.picture}
					bgSize="cover"
					bgRepeat="no-repeat"
					_hover={{ opacity: '80%' }}
					_active={{}}
					_focus={{}}
					borderRadius="full"
					onClick={onOpen}
					pb="10"
					boxSize="24"
				>
					{userProfile.picture === '' ? (
						<Img src="/images/editImage.png" boxSize="24" />
					) : (
						''
					)}
				</Button>
				<Button
					fontSize="sm"
					bg={theme.text.primary}
					borderRadius="sm"
					px="2"
					h="max-content"
					py="1"
					_hover={{}}
					_focus={{ bg: theme.text.primary }}
					onClick={onOpen}
				>
					{translate('editProfileImage')}
				</Button>
			</Flex>
			<Flex h="full" direction="column" align="center" pt="24">
				<form onSubmit={handleSubmit(handleEditProfile)}>
					<FormControl>
						<Flex direction="column" gap="8">
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
								<Text fontSize="xs" color="red">
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
								<Text fontSize="xs" color="red">
									{errors.email?.message}
								</Text>
							</Flex>
							<Button
								type="submit"
								px="28"
								bg={theme.text.primary}
								_hover={{ opacity: '80%' }}
								_focus={{ bg: theme.text.primary }}
								fontWeight="medium"
								fontSize="md"
								borderRadius="sm"
							>
								{translate('saveChanges')}
							</Button>
						</Flex>
					</FormControl>
				</form>
			</Flex>
		</>
	);
};

export default EditProfileComponent;

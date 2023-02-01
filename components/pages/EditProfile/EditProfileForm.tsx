import {
	Button,
	Flex,
	FormControl,
	Input,
	Text,
	TextProps,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { limitSpecialCharacterRegex, nameRegex } from 'utils';
import * as yup from 'yup';

interface IEditProfile {
	name: string;
	type: string;
	email: string;
	description?: string;
}

export const EditProfileForm: FC = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('edit-profile');

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
		<form onSubmit={handleSubmit(handleEditProfile)}>
			<FormControl>
				<Flex direction="column" gap="8" pt="7" bg="red">
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
	);
};

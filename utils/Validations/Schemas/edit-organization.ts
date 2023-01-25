import * as yup from 'yup';
import { limitSpecialCharacterRegex, nameRegex } from 'utils';

export const editOrganizationSchema = yup.object().shape({
	name: yup.string().matches(nameRegex, `name shouldn't accept number`).min(3),
	email: yup
		.string()
		.lowercase()
		.email('Invalid email format')
		.matches(limitSpecialCharacterRegex, `Your email may contain _ - @ .`),
	type: yup.object(),
	network: yup.object(),
});

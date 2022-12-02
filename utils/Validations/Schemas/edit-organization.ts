import * as yup from 'yup';
import { limitSpecialCharacterRegex, nameRegex } from '../regex';

export const editOrganizationSchema = yup.object().shape({
	name: yup
		.string()
		.required('Required')
		.matches(nameRegex, `name shouldn't accept number`)
		.min(3),
	email: yup
		.string()
		.lowercase()
		.required('Required')
		.email('Invalid email format')
		.matches(limitSpecialCharacterRegex, `Your email may contain _ - @ .`),
	type: yup.object().required('Required'),
	network: yup.object().required('Required'),
});

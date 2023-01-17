import * as yup from 'yup';
import { nameRegex } from '../regex';

export const createTeamSchema = yup.object().shape({
	name: yup
		.string()
		.required('Required')
		.matches(nameRegex, `name shouldn't accept number`)
		.min(3),
});

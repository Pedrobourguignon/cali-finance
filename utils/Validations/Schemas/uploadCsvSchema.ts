import * as yup from 'yup';

export const uploadCsvSchema = yup.object().shape({
	file: yup
		.mixed()
		.required('Required')
		.test(
			'fileSize',
			'The file is too large',
			value => value && value[0].size <= 1000
		),
});

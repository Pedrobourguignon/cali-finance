import * as yup from 'yup';

export const imageUploader = yup.object().shape({
	size: yup.mixed().test('fileSize', 'The file is too large', value => {
		console.log(value);
		return value && value[0].size <= 5000000;
	}),
});

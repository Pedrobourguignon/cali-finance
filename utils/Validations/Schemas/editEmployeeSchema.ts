import * as yup from 'yup';

export const editEmployeeSchema = yup.object().shape({
	amount: yup
		.number()
		.required('Required')
		.typeError('Amount must be a number')
		.positive('Amount must be positive'),
});

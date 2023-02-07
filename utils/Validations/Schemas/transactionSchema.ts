import * as yup from 'yup';

export const transactionSchema = yup.object().shape({
	amount: yup
		.number()
		.typeError('Amount must be a number')
		.required('Required'),
});

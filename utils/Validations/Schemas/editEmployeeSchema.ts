import * as yup from 'yup';

export const editEmployeeSchema = yup.object().shape({
	amount: yup.number().required('Required'),
	team: yup.string().required('Required'),
});

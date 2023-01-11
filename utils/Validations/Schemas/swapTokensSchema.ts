import * as yup from 'yup';

export const swapTokensSchema = yup.object().shape({
	youPay: yup.number().required('Required'),
	youReceive: yup.number().required('Required'),
});

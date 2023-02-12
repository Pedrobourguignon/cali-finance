import useTranslation from 'next-translate/useTranslation';
import * as yup from 'yup';
import { limitSpecialCharacterRegex, nameRegex } from 'utils';
import { ethAddressRegex } from '../utils/Validations/regex';

const useSchema = () => {
	const { t: translate } = useTranslation('schemas');
	const editProfileSchema = yup.object().shape({
		name: yup
			.string()
			.required(translate('required'))
			.matches(nameRegex, translate('nameDontAcceptNumber'))
			.min(3, translate('nameMin')),
		email: yup
			.string()
			.lowercase()
			.required(translate('required'))
			.email(translate('emailFormatInvalid'))
			.matches(limitSpecialCharacterRegex, translate('emailContains')),
	});
	const editEmployeeSchema = yup.object().shape({
		amount: yup
			.number()
			.required(translate('required'))
			.typeError(translate('amountMustBeANumber'))
			.positive('amountMustBeAPositive'),
	});
	const addEmployeeSchema = yup.object().shape({
		walletAddress: yup
			.string()
			.required(translate('required'))
			.matches(ethAddressRegex, translate('walletNotExist'))
			.min(40),
		amount: yup
			.number()
			.required(translate('required'))
			.positive(translate('amountMustBeAPositive'))
			.typeError(translate('amountMustBeANumber')),
	});

	const createCompanySchema = yup.object().shape({
		name: yup
			.string()
			.required(translate('required'))
			.matches(nameRegex, translate('nameDontAcceptNumber'))
			.min(3),
		email: yup
			.string()
			.lowercase()
			.required(translate('required'))
			.email(translate('emailFormatInvalid'))
			.matches(limitSpecialCharacterRegex, translate('emailContains')),
		type: yup.object().required(translate('required')),
		network: yup.object().required(translate('required')),
	});

	const editCompanySchema = yup.object().shape({
		name: yup
			.string()
			.required(translate('required'))
			.matches(nameRegex, translate('nameDontAcceptNumber'))
			.min(3),
		email: yup
			.string()
			.lowercase()
			.email(translate('emailFormatInvalid'))
			.matches(limitSpecialCharacterRegex, translate('emailContains')),
		type: yup.object().required(translate('required')),
		network: yup.object().required(translate('required')),
	});

	const transactionSchema = yup.object().shape({
		amount: yup
			.number()
			.typeError(translate('amountMustBeANumber'))
			.required(translate('required'))
			.positive(translate('amountMustBeAPositive')),
	});

	const uploadCsvSchema = yup.object().shape({
		file: yup
			.mixed()
			.required(translate('required'))
			.test(
				'fileSize',
				'The file is too large',
				value => value && value[0].size <= 1000
			),
	});

	return {
		editProfileSchema,
		editEmployeeSchema,
		addEmployeeSchema,
		createCompanySchema,
		editCompanySchema,
		transactionSchema,
		uploadCsvSchema,
	};
};

export { useSchema };

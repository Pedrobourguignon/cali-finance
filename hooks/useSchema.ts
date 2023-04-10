import useTranslation from 'next-translate/useTranslation';
import * as yup from 'yup';
import {
	limitSpecialCharacterRegex,
	nameRegex,
	ethAddressRegex,
	sixDigisAfterComma,
	companyNameRegex,
} from 'utils';

const useSchema = () => {
	const { t: translate } = useTranslation('schemas');
	const editProfileSchema = yup.object().shape({
		name: yup.string().matches(nameRegex, translate('nameDontAcceptNumber')),
		email: yup.string().lowercase().email(translate('emailFormatInvalid')),
	});

	const addEmployeeSchema = yup.object().shape({
		walletAddress: yup
			.string()
			.required(translate('required'))
			.matches(ethAddressRegex, translate('walletNotExist'))
			.min(40),
		amount: yup
			.number()
			.test('is-decimal', translate('sixDigits'), (val: any) =>
				sixDigisAfterComma.test(val)
			)
			.required(translate('required'))
			.positive(translate('amountMustBeAPositive'))
			.typeError(translate('amountMustBeANumber')),
	});
	const editEmployeeSchema = yup.object().shape({
		amount: yup
			.number()
			.test('is-decimal', translate('sixDigits'), (val: any) =>
				sixDigisAfterComma.test(val)
			)
			.required(translate('required'))
			.typeError(translate('amountMustBeANumber'))
			.positive(translate('amountMustBeAPositive')),
	});

	const createCompanySchema = yup.object().shape({
		name: yup
			.string()
			.required(translate('required'))
			.matches(companyNameRegex, translate('nameDontAcceptNumber'))
			.min(3),
		contactEmail: yup
			.string()
			.lowercase()
			.required(translate('required'))
			.email(translate('emailFormatInvalid'))
			.matches(limitSpecialCharacterRegex, translate('emailContains')),
	});

	const editCompanySchema = yup.object().shape({
		name: yup
			.string()
			.required(translate('required'))
			.matches(nameRegex, translate('nameDontAcceptNumber'))
			.min(3),
		contactEmail: yup
			.string()
			.lowercase()
			.email(translate('emailFormatInvalid'))
			.matches(limitSpecialCharacterRegex, translate('emailContains')),
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

	const socialMediaLinksSchema = yup.object().shape({
		website: yup.string(),
		company: yup.string(),
		twitter: yup.string(),
		telegram: yup.string(),
		medium: yup.string(),
	});

	return {
		editProfileSchema,
		editEmployeeSchema,
		createCompanySchema,
		editCompanySchema,
		transactionSchema,
		uploadCsvSchema,
		addEmployeeSchema,
		socialMediaLinksSchema,
	};
};

export { useSchema };

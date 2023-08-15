import { Flex } from '@chakra-ui/react';
import { readContract } from '@wagmi/core';
import { useAuth, useCompanies } from 'hooks';
import { useEffect, useState } from 'react';
import companyAbi from 'utils/abi/company.json';
import {
	MissingFundsWarning,
	MultipleCompaniesAlert,
	SingleCompanyAlert,
} from 'components';
import { GetCompanyUsersRes } from 'types/interfaces/main-server/IUser';
import { formatContractNumbers, formatUsd } from 'utils';
import { useRouter } from 'next/router';

export const AlertsComponent = () => {
	const { companiesWithMissingFunds, getAllCompanyEmployees } = useCompanies();
	const [employees, setEmployees] = useState<GetCompanyUsersRes[]>([]);
	const { session } = useAuth();
	const { locale } = useRouter();

	const [missingValue, setMissingValue] = useState<number>(0);

	useEffect(() => {
		if (!companiesWithMissingFunds?.[0]?.id) return;
		getAllCompanyEmployees(companiesWithMissingFunds[0].id).then(setEmployees);
	}, [companiesWithMissingFunds]);

	const calculateMissingFunds = async () => {
		const employeesWallet: string[] = [];
		employees?.forEach(employee => {
			if (!employee.wallet) return;
			if (!employeesWallet.includes(employee.wallet)) {
				employeesWallet.push(employee.wallet);
			}
		});
		if (companiesWithMissingFunds[0]?.contract && session && locale) {
			try {
				const data = await readContract({
					address: companiesWithMissingFunds[0].contract,
					abi: companyAbi,
					functionName: 'getBulkBalance',
					args: [employeesWallet],
				});
				const result = await Promise.all([...(data as bigint[])]);
				const numberResult = result.map(item =>
					Number(
						formatContractNumbers(
							item,
							locale,
							companiesWithMissingFunds[0]?.tokenDecimals || 18,
							false
						)
					)
				);
				const sum = numberResult.reduce(
					(accumulator, currentValue) => accumulator + currentValue,
					0
				);
				setMissingValue(+formatUsd(sum, locale));
			} catch (err) {
				console.log(err);
			}
		}
	};
	useEffect(() => {
		calculateMissingFunds();
	}, [employees]);

	if (companiesWithMissingFunds.length > 1) {
		return (
			<MissingFundsWarning>
				<MultipleCompaniesAlert />
			</MissingFundsWarning>
		);
	}
	if (missingValue) {
		return (
			<MissingFundsWarning>
				<SingleCompanyAlert missingValue={missingValue} />
			</MissingFundsWarning>
		);
	}
	return <Flex />;
};

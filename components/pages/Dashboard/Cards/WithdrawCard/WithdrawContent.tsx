import { Flex, Img, Text } from '@chakra-ui/react';
import { useTokens } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import {
	GetUserCompaniesRes,
	ICompany,
} from 'types/interfaces/main-server/ICompany';
import { formatCrypto, formatCryptoToDollar, getCoinLogo } from 'utils';

interface ISelectedCoin {
	onOpen: () => void;
	userCompanies: ICompany[];
	company: GetUserCompaniesRes;
	employeeBalance: bigint;
}

export const WithdrawContent: React.FC<ISelectedCoin> = ({
	company,
	employeeBalance,
}) => {
	const { t: translateCompanies } = useTranslation('companies');
	const { listOfTokens } = useTokens();

	return (
		<Flex direction="column" gap="4">
			<Flex direction="column" gap="2">
				<Text color="black" fontSize="sm">
					{translateCompanies('company')}: {company.name}
				</Text>
			</Flex>
			<Flex direction="column">
				<Flex align="center" justify="space-between">
					<Text fontSize="sm" color="black">
						{translateCompanies('availableToWithdraw')}
					</Text>
					<Flex fontSize={{ base: 'sm', md: 'xs', xl: 'sm' }}>
						<Flex direction="column">
							<Text color="black">
								{`$ ${
									company.tokenDecimals
										? formatCryptoToDollar(
												employeeBalance,
												company.tokenDecimals
										  )
										: 0
								}`}
							</Text>
							<Flex align="center" gap="1">
								<Text fontSize="xs" color="black">
									{`${
										company.tokenDecimals
											? formatCrypto(employeeBalance, company.tokenDecimals)
											: null
									}`}
								</Text>
								<Img src={getCoinLogo('USDT', listOfTokens)} boxSize="4" />
							</Flex>
						</Flex>
					</Flex>
				</Flex>
				{/* <InputGroup h="max-content">
					<Input
						_placeholder={{
							color: 'blackAlpha.500',
							fontSize: { lg: 'xs', xl: 'sm' },
						}}
						placeholder="0.00"
						borderColor={theme.bg.primary}
						flex="3"
						borderRightRadius="none"
						_hover={{}}
						color="blackAlpha.500"
						type="number"
						h="8"
					/>
					<Button
						p="0"
						borderLeftRadius="none"
						bg={theme.bg.primary}
						_hover={{ opacity: '80%' }}
						_active={{}}
						_focus={{}}
						onClick={onOpen}
						w={{ lg: '50%', xl: '40%' }}
						h="8"
					>
						<Flex gap="2" align="center">
							<Img boxSize={{ lg: '4' }} src={coin.logo} />
							<Text
								fontSize={{ lg: 'xs', xl: 'sm' }}
								width={{ lg: '6', xl: '8' }}
								lineHeight="5"
							>
								{coin.symbol}
							</Text>
							<Icon boxSize={{ lg: '2', xl: '4' }} as={IoIosArrowDown} />
						</Flex>
					</Button>
				</InputGroup> */}
			</Flex>
		</Flex>
	);
};

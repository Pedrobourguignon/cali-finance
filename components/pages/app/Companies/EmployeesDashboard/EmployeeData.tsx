import {
	Button,
	Flex,
	Icon,
	Img,
	Select,
	Text,
	useDisclosure,
	useToast,
	useClipboard,
} from '@chakra-ui/react';
import { MdContentCopy } from 'react-icons/md';
import { formatFiat, getLogo, truncateWallet } from 'utils';
import useTranslation from 'next-translate/useTranslation';
import {
	AlertToast,
	EditEmployee,
	EditEmployeeMobile,
	EmployeeStatus,
} from 'components';
import { GetCompanyUsersRes } from 'types/interfaces/main-server/IUser';

const teams = ['General', 'Marketing', 'Finance', 'Trozorba'];
interface IEmployeeData {
	employee: GetCompanyUsersRes;
	display?: string;
	isGeneral?: boolean;
}
export const EmployeeData: React.FC<IEmployeeData> = ({
	employee,
	display,
	isGeneral,
}) => {
	const toast = useToast();
	const { t: translate } = useTranslation('create-team');
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isOpenMobile,
		onOpen: onOpenMobile,
		onClose: onCloseMobile,
	} = useDisclosure();
	const { onCopy } = useClipboard(employee.wallet ? employee.wallet : '');

	const handleCopyButton = () => {
		onCopy();
		toast({
			position: 'top-right',
			render: () => (
				<AlertToast
					onClick={toast.closeAll}
					text="addressCopiedSuccessfully"
					type="success"
				/>
			),
		});
	};

	const handleEmployeeAmount = () => {
		if (employee.status === 1 && employee.revenue) {
			return (
				<Flex direction="column" align="end" flex="3">
					<Flex gap="1" fontSize="xs">
						<Text>{formatFiat(employee.revenue)}</Text>
						<Text>{employee.asset?.toUpperCase()}</Text>
					</Flex>
					<Flex display={{ base: 'none', sm: 'flex' }}>
						<Button
							color="gray.500"
							fontSize="xs"
							fontWeight="medium"
							h="max-content"
							px="0"
							onClick={onOpen}
						>
							<Text w="100%" align="end">
								{translate('edit')}
							</Text>
						</Button>
					</Flex>
					<Flex display={{ base: 'flex', sm: 'none' }}>
						<Button
							color="gray.500"
							fontSize="xs"
							fontWeight="medium"
							h="max-content"
							px="0"
							onClick={onOpenMobile}
						>
							<Text w="100%" align="end">
								{translate('edit')}
							</Text>
						</Button>
					</Flex>
				</Flex>
			);
		}
		if (employee.status === 0) {
			return (
				<Flex direction="column" align="end" flex="3">
					<Text>-</Text>
				</Flex>
			);
		}
		return (
			<Flex direction="column" align="end" flex="3">
				<Text>{translate('tryAgain')}</Text>
			</Flex>
		);
	};

	return (
		<Flex
			w="100%"
			align="center"
			bg="white"
			color="black"
			px="4"
			h={{ base: '4.5rem', md: '3.25rem' }}
			borderRadius="base"
		>
			<EditEmployee isOpen={isOpen} onClose={onClose} employee={employee} />
			<EditEmployeeMobile
				isOpen={isOpenMobile}
				onClose={onCloseMobile}
				employee={employee}
			/>
			<Flex direction="column" flex="4.5" gap="2">
				<Flex display={{ base: 'flex', md: 'none' }}>
					<EmployeeStatus status={employee.status} />
				</Flex>

				<Flex
					justify="start"
					align="center"
					onClick={() => handleCopyButton()}
					gap="3"
					flex="4.5"
				>
					<Img
						src={
							employee.picture === null
								? '/images/editImage.png'
								: getLogo(employee.picture as string)
						}
						boxSize="6"
						borderRadius="full"
					/>
					<Flex direction="column" justifyItems="center">
						<Text
							fontSize={{ base: 'xs', md: 'sm' }}
							display={{ base: 'flex', sm: 'none' }}
						>
							{employee.name?.length !== 40
								? truncateWallet(employee.wallet)
								: employee.name}
						</Text>
						<Text
							fontSize={{ base: 'xs', md: 'sm' }}
							display={{ base: 'none', sm: 'flex' }}
						>
							{employee.name?.length !== 40
								? truncateWallet(employee.wallet)
								: employee.name}
						</Text>
						<Flex align="center">
							<Text fontSize="xs" color="gray.500">
								{truncateWallet(employee.wallet)}
							</Text>
							<Button
								w="3"
								h="3"
								bg="transparent"
								onClick={() => {
									handleCopyButton();
								}}
							>
								<Icon as={MdContentCopy} boxSize="3" color="gray.500" />
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</Flex>

			<Flex flex="3" display={{ base: 'none', md: 'flex' }}>
				<EmployeeStatus status={employee.status} />
				{isGeneral && (
					<Select
						borderColor="gray.200"
						borderRadius="base"
						fontSize="sm"
						w="40"
						h="6"
						display={display}
					>
						{teams.map((item, index) => (
							<option style={{ background: 'white' }} key={+index}>
								{item}
							</option>
						))}
					</Select>
				)}
			</Flex>
			{handleEmployeeAmount()}
		</Flex>
	);
};

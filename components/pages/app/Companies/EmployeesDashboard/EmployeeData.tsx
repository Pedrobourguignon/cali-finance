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
	Skeleton,
} from '@chakra-ui/react';
import { MdContentCopy } from 'react-icons/md';
import { truncateWallet } from 'utils';
import useTranslation from 'next-translate/useTranslation';
import { AlertToast, EditEmployee, EditEmployeeMobile } from 'components';
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
	const { onCopy } = useClipboard(employee.wallet!);

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

	return (
		<Flex
			w="100%"
			justify="space-between"
			align="center"
			bg="white"
			color="black"
			px="4"
			h="3.25rem"
			borderRadius="base"
		>
			<EditEmployee isOpen={isOpen} onClose={onClose} employee={employee} />
			<EditEmployeeMobile
				isOpen={isOpenMobile}
				onClose={onCloseMobile}
				employee={employee}
			/>
			<Flex justify="center" align="center" gap="3">
				<Img
					src={
						employee.picture === null
							? '/images/editImage.png'
							: employee.picture
					}
					boxSize="6"
				/>
				<Flex direction="column" justifyItems="center">
					<Text fontSize="sm" display={{ base: 'flex', sm: 'none' }}>
						{employee.name?.length !== 40
							? truncateWallet(employee.wallet)
							: employee.name}
					</Text>
					<Text fontSize="sm" display={{ base: 'none', sm: 'flex' }}>
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
			<Flex>
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
			<Flex direction="column" align="end">
				{employee.revenue ? (
					<Flex gap="1" fontSize="xs">
						<Text>{employee.revenue.toLocaleString('en-US')}</Text>
						<Text>{employee.asset?.toUpperCase()}</Text>
					</Flex>
				) : (
					<Flex gap="1">
						<Skeleton width="16" height="3" />
						<Skeleton width="8" height="3" />
					</Flex>
				)}
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
		</Flex>
	);
};

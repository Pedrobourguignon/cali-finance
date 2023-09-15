import {
	Button,
	Flex,
	Img,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	Textarea,
	TextProps,
} from '@chakra-ui/react';
import { useAuth, usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { BlackButton } from 'components';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { Dispatch, SetStateAction } from 'react';
import { ICompany } from 'types/interfaces/main-server/ICompany';
// eslint-disable-next-line import/no-unresolved
import { FieldErrors, UseFormRegister } from 'react-hook-form/dist/types';

interface ICreateCompanyComponent {
	isLoadingButton: boolean;
	register: UseFormRegister<ICompany>;
	errors: FieldErrors<ICompany>;
	isValid: boolean;
	setSelectedType: Dispatch<SetStateAction<string>>;
	selectedType: string;
	selectedNetwork: {
		name: string;
		icon: string;
		id: number;
	};
	setSelectedNetwork: Dispatch<
		SetStateAction<{
			name: string;
			icon: string;
			id: number;
		}>
	>;
}
interface INetworkSelect {
	name: string;
	id: number;
	icon: string;
}
interface IBasicSelect {
	value: string;
}

const networksType: INetworkSelect[] = [
	{ name: 'Ethereum', id: 1, icon: '/images/eth.png' },
	{ name: 'Polygon', id: 137, icon: '/images/polygon.png' },
	{ name: 'BNB Chain', id: 56, icon: '/images/bnbchain.png' },
];

const labelStyle: TextProps = {
	color: 'black',
	fontSize: 'sm',
	fontWeight: 'medium',
};

export const CreateCompanyComponent: React.FC<ICreateCompanyComponent> = ({
	errors,
	register,
	selectedNetwork,
	selectedType,
	setSelectedNetwork,
	setSelectedType,
	isValid,
	isLoadingButton,
}) => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('create-company');
	const { session } = useAuth();

	const companiesType: IBasicSelect[] = [
		{ value: 'DAO' },
		{ value: 'E-commerce' },
		{ value: translate('financial') },
		{ value: 'SaaS' },
		{ value: translate('others') },
	];

	return (
		<Flex direction="column" minW="24.2rem">
			<Flex
				direction="column"
				gap={{ md: '2', lg: '6' }}
				mb={{ md: '8', lg: '10' }}
				position="relative"
			>
				<Text color="black" fontSize="xl" fontWeight="medium">
					{translate('createCompany')}
				</Text>
				<Input
					color="black"
					placeholder={translate('companyName')}
					borderBottomWidth="0,125rem"
					borderBottomColor="black"
					borderRadius="none"
					disabled={!session}
					px="1"
					h="8"
					fontSize="2xl"
					_placeholder={{
						color: 'blackAlpha.500',
						fontSize: '2xl',
					}}
					_hover={{}}
					{...register('name')}
				/>
				<Text fontSize="xs" color="red" position="absolute" top="100%">
					{errors.name?.message}
				</Text>
			</Flex>
			<Flex py="10" justify="space-between">
				<Flex direction="column" gap="8" w="100%" maxW={{ lg: '80' }}>
					<Flex direction="column" color="black" gap="6">
						<Flex
							justify="space-between"
							w="100%"
							flexWrap={{ md: 'wrap', lg: 'nowrap' }}
							gap="8"
						>
							<Flex direction="column" w="100%">
								<Text {...labelStyle} mb="2">
									{translate('type')}
								</Text>
								<Menu>
									<MenuButton
										px="3"
										w={{ md: 'full', lg: '20rem' }}
										border="1px solid black"
										borderColor={errors.type ? 'red' : theme.bg.primary}
										fontWeight="normal"
										_hover={{}}
										_active={{}}
										_focus={{}}
										isDisabled={!session}
										h="8"
										as={Button}
										rightIcon={<ChevronDownIcon />}
										bg="white"
										fontSize="sm"
										color={
											selectedType === translate('pleaseSelect')
												? 'blackAlpha.500'
												: theme.text.primary
										}
									>
										<Flex>{selectedType}</Flex>
									</MenuButton>
									<MenuList
										bg="white"
										boxShadow="none"
										borderColor="#121212"
										borderRadius="base"
										w={{ md: '33.75rem', lg: '20rem' }}
									>
										{companiesType.map((type, index) => (
											<MenuItem
												key={+index}
												bg="transparent"
												fontSize="sm"
												_hover={{ bg: 'gray.100' }}
												onClick={() => {
													setSelectedType(type.value);
												}}
											>
												{type.value}
											</MenuItem>
										))}
									</MenuList>
								</Menu>
							</Flex>
							<Flex
								direction="column"
								color={theme.text.primary}
								w="100%"
								display={{ md: 'flex', lg: 'none' }}
							>
								<Flex gap="2" mb="2" align="center">
									<Text {...labelStyle}>{translate('network')}</Text>
									{/* <Tooltip
										label={
											<NetworkTooltip>
												{translate('choseTheMostSuitableNetwork')}
											</NetworkTooltip>
										}
										placement="top"
										hasArrow
										arrowShadowColor={theme.branding.blue2}
										arrowPadding={10}
										gutter={12}
										bg="none"
										shadow="none"
									>
										<span>
											<Icon
												as={BsQuestionCircle}
												color="gray.400"
												boxSize="0.813rem"
												mt="2"
											/>
										</span>
									</Tooltip> */}
								</Flex>

								<Menu>
									<MenuButton
										w={{ md: 'full', lg: '11.438rem' }}
										border="1px solid black"
										borderColor={errors.network ? 'red' : theme.bg.primary}
										fontWeight="normal"
										_hover={{}}
										_active={{}}
										_focus={{}}
										isDisabled={!session}
										h="8"
										as={Button}
										rightIcon={<ChevronDownIcon />}
										bg="white"
										fontSize="sm"
										color={
											selectedNetwork.name === translate('pleaseSelect')
												? 'blackAlpha.500'
												: theme.text.primary
										}
									>
										<Flex
											display={
												selectedNetwork.icon.length > 1 ? 'none' : 'flex'
											}
										>
											{selectedNetwork.name}
										</Flex>
										<Flex
											align="center"
											gap="2"
											display={
												selectedNetwork.icon.length > 1 ? 'flex' : 'none'
											}
										>
											<Img src={selectedNetwork.icon} boxSize="4" />
											{selectedNetwork.name}
										</Flex>
									</MenuButton>
									<MenuList
										bg="white"
										boxShadow="none"
										borderColor="#121212"
										borderRadius="base"
										minW="33.75rem"
									>
										{networksType.map((network, index) => (
											<MenuItem
												key={+index}
												bg="transparent"
												fontSize="sm"
												_hover={{ bg: 'gray.100' }}
												onClick={() => {
													setSelectedNetwork({
														name: network.name,
														icon: network.icon,
														id: network.id,
													});
												}}
												gap="2"
											>
												<Img src={network.icon} boxSize="4" />
												{network.name}
											</MenuItem>
										))}
									</MenuList>
								</Menu>
								<Text fontSize="xs" color="red">
									{errors.type?.message}
								</Text>
							</Flex>
						</Flex>
						<Flex direction="column" position="relative">
							<Text {...labelStyle} mb="2">
								{translate('corporativeEmail')}
							</Text>

							<Input
								px="3"
								disabled={!session}
								placeholder={translate('exampleEmail')}
								_placeholder={{
									color: 'blackAlpha.500',
									fontSize: 'sm',
								}}
								h="8"
								bgColor="white"
								borderRadius="base"
								_hover={{}}
								borderColor={errors.contactEmail ? 'red' : theme.bg.primary}
								{...register('contactEmail')}
							/>
							<Text fontSize="xs" color="red" position="absolute" top="100%">
								{errors.contactEmail?.message}
							</Text>
						</Flex>
						<Flex direction="column">
							<Text {...labelStyle} mb="2">
								{translate('description')}
							</Text>
							<Textarea
								px="3"
								disabled={!session}
								_placeholder={{
									color: 'blackAlpha.500',
									fontSize: 'sm',
									verticalAlign: 'baseline',
								}}
								_hover={{}}
								bgColor="white"
								placeholder={translate('exampleDescription')}
								minH="7.2rem"
								borderColor={theme.bg.primary}
								{...register('description')}
								maxLength={255}
							/>
						</Flex>
					</Flex>
					<BlackButton
						type="submit"
						gap="2.5"
						isDisabled={
							selectedType === translate('pleaseSelect') ||
							selectedNetwork.id === 0 ||
							!!errors?.name ||
							!isValid
						}
						fontWeight="medium"
						fontSize="md"
						lineHeight="6"
						display={{ md: 'none', lg: 'flex' }}
						maxH="10"
						py="2.5"
						borderRadius="sm"
						isLoading={isLoadingButton}
					>
						<Text>+</Text>
						<Text>{translate('createCompany')}</Text>
					</BlackButton>
				</Flex>
				<Flex
					direction="column"
					color={theme.text.primary}
					display={{ md: 'none', lg: 'flex' }}
					maxW="48"
				>
					<Flex gap="2" align="center">
						<Text {...labelStyle} mb="2">
							{translate('network')}
						</Text>
						{/* <Tooltip
							label={
								<NetworkTooltip>
									{translate('choseTheMostSuitableNetwork')}
								</NetworkTooltip>
							}
							placement="top"
							hasArrow
							arrowShadowColor={theme.branding.blue2}
							arrowPadding={10}
							gutter={12}
							bg="none"
							shadow="none"
						>
							<span>
								<Icon
									as={BsQuestionCircle}
									color="gray.400"
									boxSize="0.813rem"
									mb="1"
								/>
							</span>
						</Tooltip> */}
					</Flex>
					<Menu>
						<MenuButton
							pl="3"
							isDisabled
							_disabled={{ color: 'black' }}
							cursor="not-allowed"
							w={{ md: '11.438rem' }}
							border="1px solid black"
							borderColor={errors.network ? 'red' : theme.bg.primary}
							fontWeight="normal"
							_hover={{}}
							_active={{}}
							_focus={{}}
							// isDisabled={!session}
							h="8"
							as={Button}
							rightIcon={<ChevronDownIcon />}
							bg="white"
							fontSize="sm"
							color={
								selectedNetwork.name === translate('pleaseSelect')
									? 'blackAlpha.500'
									: theme.text.primary
							}
						>
							<Flex display={selectedNetwork.icon.length > 1 ? 'none' : 'flex'}>
								{selectedNetwork.name}
							</Flex>
							<Flex
								align="center"
								gap="2"
								display={selectedNetwork.icon.length > 1 ? 'flex' : 'none'}
							>
								<Img src={selectedNetwork.icon} boxSize="4" />
								{selectedNetwork.name}
							</Flex>
						</MenuButton>
						<MenuList
							bg="white"
							boxShadow="none"
							borderColor="#121212"
							borderRadius="base"
							minW="11.438rem"
						>
							{networksType.map((network, index) => (
								<MenuItem
									key={+index}
									bg="transparent"
									fontSize="sm"
									_hover={{ bg: 'gray.100' }}
									onClick={() => {
										setSelectedNetwork({
											name: network.name,
											icon: network.icon,
											id: network.id,
										});
									}}
									gap="2"
								>
									<Img src={network.icon} boxSize="4" />
									{network.name}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
					<Text fontSize="xs" color="red">
						{errors.type?.message}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

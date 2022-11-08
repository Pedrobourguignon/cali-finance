/* eslint-disable import/no-named-as-default */
import {
	Flex,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Button,
	Skeleton,
	SkeletonCircle,
	Stack,
	Icon,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import React from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { IHistoryPage } from 'types';

export const HistoryComponent: React.FC<IHistoryPage> = ({ history }) => {
	const theme = usePicasso();
	const isConnected = true;
	const shouldDisplay = isConnected ? 'flex' : 'none';
	const shouldntDisplay = isConnected ? 'none' : 'flex';
	return (
		<Flex
			bg="#EDF2F7"
			w="full"
			h="95vh"
			m="auto"
			borderLeft="0.25rem solid"
			borderColor={theme.branding.blue}
			borderLeftRadius="sm"
			gap="4"
			py="8"
			px="7"
		>
			<Flex direction="column" gap="2">
				<Flex justify="space-between">
					<Flex direction="column" gap="4">
						<Text fontSize="md" fontStyle="medium" fontWeight="500">
							History
						</Text>
						<Text fontSize="sm" display={shouldntDisplay}>
							Please connect your wallet to be able to view your history.
						</Text>
					</Flex>
					<Menu>
						<MenuButton
							h="max-content"
							as={Button}
							rightIcon={<BiChevronDown />}
							bg="white"
							gap="10"
							fontSize="sm"
							px="3"
							py="2"
							disabled={!isConnected}
							_hover={{}}
						>
							All
						</MenuButton>
						<MenuList>
							<MenuItem>Download</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
				<Flex
					gap="16"
					bg="white"
					w="max-content"
					p="3"
					display={shouldntDisplay}
				>
					<Flex gap="3" align="center">
						<SkeletonCircle size="6" />
						<Skeleton width="28" height="5" />
					</Flex>
					<Flex gap="3" align="center">
						<SkeletonCircle size="6" />
						<Skeleton width="28" height="5" />
					</Flex>
					<Flex gap="2" align="center">
						<SkeletonCircle size="4" />
						<Stack spacing="1">
							<Skeleton width="16" height="4" />
							<Skeleton width="10" height="3" />
						</Stack>
					</Flex>
					<Flex gap="3" direction="column">
						<Stack spacing="1" align="end">
							<Skeleton width="16" height="3" />
							<Skeleton width="10" height="3" />
						</Stack>
					</Flex>
				</Flex>
				<Flex direction="column" gap="2" display={shouldDisplay}>
					{history.map((notification, index) => (
						<Flex
							key={+index}
							bg="white"
							px="3"
							py="2"
							gap="16"
							borderRadius="base"
							align="center"
						>
							<Flex align="center" gap="3">
								<Icon as={notification.companyIcon} boxSize="6" />
								<Text fontSize="sm" fontWeight="600" color="#121212">
									{notification.company}
								</Text>
							</Flex>
							<Flex align="center" gap="3">
								<Icon as={notification.userIcon} boxSize="6" />
								<Flex direction="column">
									<Text fontSize="sm" fontWeight="400" color="#121212">
										{notification.userWalletAddress}
									</Text>
									<Text fontSize="xs" fontWeight="400" color="gray.500">
										{notification.userTeam}
									</Text>
								</Flex>
							</Flex>
							<Flex align="center" gap="3">
								<Icon as={notification.typeIcon} boxSize="4" />
								<Flex direction="column">
									<Text fontSize="sm" fontWeight="400" color="#121212">
										{notification.type}
									</Text>
									<Text fontSize="xs" fontWeight="400" color="gray.500">
										{notification.date}
									</Text>
								</Flex>
							</Flex>
							<Flex direction="column" align="end" h="max-content">
								<Text color="#121212" fontWeight="400" fontSize="xs">
									{notification.value}
								</Text>
								<Text
									color={
										notification.status === 'Completed'
											? 'green.400'
											: 'yellow.600'
									}
									fontWeight="400"
									fontSize="xs"
								>
									{notification.status}
								</Text>
							</Flex>
						</Flex>
					))}
				</Flex>
			</Flex>
			<Flex w="296px" h="629px" bg="#121212">
				a
			</Flex>
		</Flex>
	);
};

export default HistoryComponent;

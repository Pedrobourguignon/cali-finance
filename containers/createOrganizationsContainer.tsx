import {
	Button,
	Flex,
	Input,
	InputGroup,
	Select,
	Text,
	Textarea,
} from '@chakra-ui/react';
import { NewOrganizationLinks } from 'components';
import { BackToOrganizations } from 'components/Buttons/BacktoOrganizationsButton';
import { usePicasso } from 'hooks';
import { AppLayout } from 'layouts';

export const CreateOrganizationContainer = () => {
	const theme = usePicasso();
	return (
		<AppLayout right={<NewOrganizationLinks />}>
			<Flex direction="column" align="flex-start" gap="10">
				<BackToOrganizations />
				<Flex w="100%" direction="column">
					<form>
						<Flex direction="column" gap="6" mb="14">
							<Text color="black" fontSize="xl" fontWeight="medium">
								Create Organization
							</Text>
							<Input
								color="black"
								placeholder="Organization Name *"
								borderBottomWidth="0,125rem"
								borderBottomColor="black"
								borderRadius="none"
								_placeholder={{ color: 'blackAlpha.500', fontSize: 'xl' }}
								_hover={{}}
							/>
						</Flex>
						<Flex w="100%" bg={theme.bg.gray2} py="6">
							<Flex direction="column" gap="8" minW="80">
								<Flex direction="column" color="black" gap="6">
									<Flex direction="column">
										<Text>Type *</Text>
										<Select
											borderColor={theme.bg.primary}
											_placeholder={{ color: 'blackAlpha.500' }}
											_hover={{}}
										>
											<option>option 1</option>
											<option>option 2</option>
											<option>option 3</option>
										</Select>
									</Flex>
									<Flex direction="column">
										<Text>Corporative e-mail *</Text>
										<Input
											placeholder="example@organization.io"
											_placeholder={{ color: 'blackAlpha.500' }}
											_hover={{}}
											borderColor={theme.bg.primary}
										/>
									</Flex>
									<Flex direction="column">
										<Text>Description</Text>
										<Textarea
											borderColor={theme.bg.primary}
											_placeholder={{ color: 'blackAlpha.500' }}
											_hover={{}}
											placeholder="Hello"
										/>
									</Flex>
								</Flex>
								<Button
									bg={theme.bg.primary}
									color="white"
									borderRadius="sm"
									_hover={{}}
								>
									+ Create Organization
								</Button>
							</Flex>
						</Flex>
					</form>
				</Flex>
			</Flex>
		</AppLayout>
	);
};

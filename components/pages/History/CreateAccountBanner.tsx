import { Flex, Button, Text, Img } from '@chakra-ui/react';
import { InfosBanner, OffsetShadow } from 'components';

export const CreateAccountBanner = () => (
	<InfosBanner height="39.313rem" justify="center">
		<Flex direction="column" p="4" justify="center">
			<Flex direction="column" maxW="60" gap="2">
				<Text fontWeight="medium" fontSize="md">
					Create Account
				</Text>
				<Text fontSize="sm" fontWeight="normal">
					Unlock our all-in-one suit for surfacing unlimited teams and
					organizations payments
				</Text>
				<Flex gap="6">
					<OffsetShadow
						borderColor="white"
						position="absolute"
						px="20"
						left="1"
						top="1"
						buttonText="a"
					>
						<Button
							bg="white"
							borderRadius="base"
							color="#121212"
							fontSize="sm"
							boxSize="max-content"
							py="1.5"
							alignItems="center"
							gap="2"
							_focus={{}}
							_hover={{}}
							_active={{
								background: 'white',
								transform: 'translateY(0.25rem) translateX(0.25rem)',
							}}
						>
							<Img src="/images/star.png" boxSize="3.5" />
							Create Account Now
						</Button>
					</OffsetShadow>
				</Flex>
			</Flex>
		</Flex>
	</InfosBanner>
);

import { Button, Flex, Text, Icon } from '@chakra-ui/react';
import { CompanyIcon } from 'components';
import { usePicasso, useProfile } from 'hooks';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

export const CreateCompanyCard = () => {
	const theme = usePicasso();
	const { isConnected } = useProfile();
	return (
		<Flex
			boxShadow="base"
			direction="column"
			justify="center"
			align="center"
			borderRadius="base"
			maxW="56"
			bg="white"
			px="4"
			py="4"
			gap="4"
		>
			<Flex
				align="center"
				justify="space-between"
				gap="5"
				color={theme.text.mono}
			>
				<Icon as={CompanyIcon} boxSize="9" color={theme.text.mono} />
				<Flex direction="column">
					<Text
						fontSize="md"
						fontStyle="normal"
						fontWeight="medium"
						color={theme.text.mono}
					>
						You don’t have a Company yet
					</Text>
				</Flex>
			</Flex>
			<Button
				color="white"
				bg={theme.bg.primary}
				fontSize="sm"
				fontWeight="medium"
				borderRadius="sm"
				_hover={{ bg: 'black' }}
				gap="2"
				w="100%"
				disabled={!isConnected}
			>
				<Icon as={AiOutlinePlus} />
				Create a Company
			</Button>
		</Flex>
	);
};

export default CreateCompanyCard;

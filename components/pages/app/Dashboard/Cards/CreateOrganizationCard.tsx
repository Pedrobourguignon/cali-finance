import { Button, Flex, Text, Icon } from '@chakra-ui/react';
import { OrganizationIcon } from 'components';
import { usePicasso } from 'hooks';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

export const CreateOrganizationCard = () => {
	const theme = usePicasso();
	return (
		<Flex
			boxShadow="2xl"
			direction="column"
			justify="center"
			align="center"
			borderRadius="base"
			maxW={{ md: '44', xl: '56', '2xl': '16.6rem' }}
			px="4"
			py="4"
			gap="4"
		>
			<Flex
				align="center"
				justify="space-between"
				gap={{ xl: '5' }}
				color={theme.text.mono}
			>
				<Icon
					as={OrganizationIcon}
					boxSize={{ md: '6', xl: '9' }}
					color={theme.text.mono}
				/>
				<Flex direction="column">
					<Text
						fontSize={{ md: 'xs', xl: 'md', '2xl': 'lg' }}
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
				fontSize={{ md: 'xs', xl: 'sm' }}
				fontWeight="medium"
				borderRadius="sm"
				_hover={{ bg: 'black' }}
				gap="2"
				w="100%"
			>
				<Icon as={AiOutlinePlus} />
				Create a Company
			</Button>
		</Flex>
	);
};

export default CreateOrganizationCard;

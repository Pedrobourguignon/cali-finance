import { Button, Flex, Text, Icon } from '@chakra-ui/react';
import { OrganizationIcon } from 'components';
import { usePicasso } from 'hooks';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

export const CreateOrganizationCard = () => {
	const theme = usePicasso();
	return (
		<Flex
			w={{ xl: 'max-content' }}
			h={{ xl: 'max-content' }}
			boxShadow="2xl"
			direction="column"
			justify="center"
			align="center"
			borderRadius="base"
			maxW={{ xl: '56' }}
			px={{ xl: '6' }}
			py={{ xl: '4' }}
			gap={{ xl: '4' }}
		>
			<Flex
				align="center"
				justify="space-between"
				gap={{ xl: '5' }}
				color={theme.text.mono}
			>
				<Icon
					as={OrganizationIcon}
					boxSize={{ xl: '9' }}
					color={theme.text.mono}
				/>
				<Flex direction="column">
					<Text fontStyle="normal" fontWeight="medium" color={theme.text.mono}>
						You don’t have a Organization yet
					</Text>
				</Flex>
			</Flex>
			<Button
				color="white"
				bg={theme.bg.primary}
				fontSize={{ xl: 'sm' }}
				fontWeight="medium"
				borderRadius="sm"
				_hover={{ bg: 'black' }}
				gap={{ xl: '2' }}
				w="min-content"
			>
				<Icon as={AiOutlinePlus} />
				Create a Organization
			</Button>
		</Flex>
	);
};

export default CreateOrganizationCard;

import { Flex, Text, Icon } from '@chakra-ui/react';
import { BlackButton, CompanyIcon } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

export const CreateCompanyCard = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('dashboard');
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
			<BlackButton
				fontSize="sm"
				gap="2"
				px="7"
				py="2"
				fontWeight="medium"
				color="white"
				borderRadius="sm"
			>
				<Icon as={AiOutlinePlus} />
				{translate('createCompany')}
			</BlackButton>
		</Flex>
	);
};

export default CreateCompanyCard;

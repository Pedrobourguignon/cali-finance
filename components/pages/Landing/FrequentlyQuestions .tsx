import {
	Flex,
	Link,
	Text,
	Icon,
	Accordion,
	AccordionItem,
	AccordionButton,
	Box,
	AccordionPanel,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import {
	AiOutlinePlayCircle,
	AiOutlineArrowDown,
	AiOutlineArrowUp,
} from 'react-icons/ai';

export const FrequentlyQuestions = () => {
	const { t: translate } = useTranslation('landing');
	const theme = usePicasso();

	const questions = [
		{
			title: translate('howDoes'),
			answer: translate('ourSaasPlataform'),
		},
		{
			title: translate('whatCryptocurrencies'),
			answer: translate('ourPlataform'),
		},
		{
			title: translate('howCalculateFees'),
			answer: translate('ourFee'),
		},
		{
			title: translate('isMyCompany'),
			answer: translate('wePrioritize'),
		},
		{
			title: translate('howDoIGetStarted'),
			answer: translate('toBegin'),
		},
	];

	return (
		<Flex
			justify={{ md: 'space-evenly', lg: 'center', '2xl': 'center' }}
			w="full"
			gap={{ md: '3', lg: '12', xl: '40', '2xl': '52' }}
			direction={{ base: 'column', sm: 'row' }}
		>
			<Flex
				direction="column"
				maxW={{ md: '15rem', lg: '20rem', xl: '25rem' }}
				gap="6"
				px={{ base: '4', sm: '0' }}
			>
				<Text
					maxW={{ md: '14.375rem', lg: 'full' }}
					fontWeight="bold"
					fontSize={{ base: '2xl', sm: '3xl' }}
					lineHeight="9"
					color={theme.text.primary}
				>
					{translate('findTheAnswers')}
				</Text>
				<Link href="/" as={NextLink} w="max-content" pb="14">
					<Flex gap="2.5">
						<Icon as={AiOutlinePlayCircle} boxSize="5" color="black" />
						<Text fontSize="sm" color={theme.text.primary}>
							{translate('checkTheLibrary')}
						</Text>
					</Flex>
				</Link>
			</Flex>
			<Accordion allowToggle w={{ md: '23rem', lg: '31.5rem' }}>
				{questions.map((question, index) => (
					<AccordionItem
						key={+index}
						borderTop="none"
						borderBottom="1px solid"
						borderBottomColor="gray.200"
					>
						{({ isExpanded }) => (
							<>
								<h2>
									<AccordionButton justifyContent="space-between">
										<Box
											as="span"
											flex="1"
											textAlign="left"
											color={theme.text.primary}
											fontWeight="bold"
											maxW="25rem"
										>
											{question.title}
										</Box>
										{isExpanded ? (
											<Icon as={AiOutlineArrowUp} color="black" boxSize="5" />
										) : (
											<Icon as={AiOutlineArrowDown} color="black" boxSize="5" />
										)}
									</AccordionButton>
								</h2>
								<AccordionPanel
									pb={4}
									color={theme.text.primary}
									lineHeight="4"
									fontSize="sm"
								>
									{question.answer}
								</AccordionPanel>
							</>
						)}
					</AccordionItem>
				))}
			</Accordion>
		</Flex>
	);
};

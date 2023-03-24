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

const questions = [
	{
		title: 'Question one?',
		answer: 'lorem lorem lorem',
	},
	{
		title: 'Second question here?',
		answer:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend sagittis, eget pellentesque eu sodales venenatis. Aliquam faucibus a quis at et quis pellentesque. Eget nulla purus aliquet placerat. Tristique diam, tincidunt ornare rutrum non. Habitasse commodo lobortis viverra lectus. Fermentum, tincidunt elit tellus euismod. Adipiscing sed lacus, nunc sed lectus blandit. Malesuada morbi urna, rhoncus diam integer eu mollis. Vestibulum diam et curabitur ipsum varius sollicitudin justo, scelerisque lorem. Sed scelerisque amet erat mauris viverra at sagittis vel.',
	},
	{
		title:
			'Another question but Super Extra Long to fit into 2 lines here etc?',
		answer: 'lorem lorem lorem lorem lorem',
	},
	{
		title: 'Some question here?',
		answer: 'prisco',
	},
];

export const FrequentlyQuestions = () => {
	const { t: translate } = useTranslation('landing');
	const theme = usePicasso();
	return (
		<Flex
			justify={{ md: 'space-evenly', lg: 'center', '2xl': 'space-evenly' }}
			w="full"
			gap={{ lg: '12', xl: '40' }}
		>
			<Flex
				direction="column"
				maxW={{ md: '15rem', lg: '20rem', xl: '25rem' }}
				gap="6"
			>
				<Text
					fontWeight="bold"
					fontSize="3xl"
					lineHeight="9"
					color={theme.text.primary}
				>
					{translate('findTheAnswers')}
				</Text>
				<Link href="/" as={NextLink} w="max-content">
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

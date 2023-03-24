import { Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { FeeCalculator } from 'components';

export const PricingModelCard = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('landing');

	return (
		<Flex bg={theme.bg.primary} borderRadius="2xl" w="full">
			<Flex direction="column" w="full">
				<Flex direction="column" gap="6" pt="20" pb="14">
					<Flex direction="column">
						<Text
							noOfLines={1}
							fontSize="3xl"
							fontWeight="semibold"
							bgClip="text"
							bgGradient={theme.gradients.landing}
							lineHeight="10"
							textAlign="center"
						>
							{translate('ourPricing')}
						</Text>
						<Text
							fontSize="3xl"
							fontWeight="semibold"
							bgClip="text"
							bgGradient={theme.gradients.landing}
							textAlign="center"
						>
							{translate('straightforward')}
						</Text>
					</Flex>
					<Text fontWeight="medium" fontSize="xl" textAlign="center">
						{translate('weCharge')}
					</Text>
				</Flex>
				<Flex
					direction={{ md: 'column', lg: 'row' }}
					px="20"
					pb="20"
					justify="space-between"
					w="full"
					align="center"
					gap={{ md: '10', lg: '2', xl: '0' }}
				>
					<Flex
						direction="column"
						gap="3"
						w={{ md: '29.25rem', '2xl': '39rem' }}
						pt="2"
					>
						<Text fontSize="md">{translate('noMatterHowMuch')}</Text>
						<Text fontSize="md">{translate('seeHowOurCrypto')}</Text>
						<Text fontSize="md">{translate('optimizeYourPayroll')}</Text>
					</Flex>
					<FeeCalculator />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default PricingModelCard;

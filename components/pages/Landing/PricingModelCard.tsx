import { Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { FeeCalculator } from 'components';
import { useRouter } from 'next/router';

export const PricingModelCard = () => {
	const theme = usePicasso();
	const { locale } = useRouter();
	const { t: translate } = useTranslation('landing');

	return (
		<Flex bg={theme.bg.primary} borderRadius="2xl">
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
					px="4.563rem"
					pb="20"
					justify="space-between"
					w="full"
					align="center"
					gap={
						locale === 'pt-BR'
							? { md: '6', lg: '8', xl: '0' }
							: { md: '1', lg: '2', xl: '28' }
					}
				>
					<Flex direction="column" gap="3" pt="2" pb={{ md: '10', lg: '0' }}>
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

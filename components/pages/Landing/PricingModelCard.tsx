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
				<Flex direction="column" gap="6" pt={{ base: '10', sm: '20' }} pb="14">
					<Flex direction="column">
						<Flex
							display={{ base: 'flex', sm: 'none' }}
							direction="column"
							align="center"
						>
							<Text
								noOfLines={1}
								fontSize={{ base: '2xl', sm: '3xl' }}
								fontWeight="semibold"
								bgClip="text"
								bgGradient={theme.gradients.landing}
								lineHeight="tall"
								textAlign="center"
							>
								{translate('ourPricing')}
							</Text>
							<Text
								fontSize={{ base: '2xl', sm: '3xl' }}
								fontWeight="semibold"
								bgClip="text"
								bgGradient={theme.gradients.landing}
								textAlign="justify"
							>
								{locale === 'pt-BR'
									? translate('straightforward')
									: translate('andStraightforward')}
							</Text>
						</Flex>
						<Flex display={{ base: 'none', sm: 'flex' }} direction="column">
							<Text
								display="none"
								noOfLines={1}
								fontSize={{ base: '2xl', sm: '3xl' }}
								fontWeight="semibold"
								bgClip="text"
								bgGradient={theme.gradients.landing}
								lineHeight="tall"
								textAlign="center"
							>
								{locale === 'pt-BR'
									? translate('ourPricing')
									: translate('ourPricingAnd')}
							</Text>
							<Text
								fontSize={{ base: '2xl', sm: '3xl' }}
								fontWeight="semibold"
								bgClip="text"
								bgGradient={theme.gradients.landing}
								textAlign="center"
							>
								{translate('straightforward')}
							</Text>
						</Flex>
					</Flex>
					<Text
						fontWeight="medium"
						fontSize={{ base: 'md', sm: 'xl' }}
						textAlign="center"
					>
						{translate('weCharge')}
					</Text>
				</Flex>
				<Flex
					display={{ base: 'none', sm: 'flex' }}
					direction={{ base: 'column', lg: 'row' }}
					px={{ base: '0', sm: '4.563rem' }}
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
					<Flex
						direction="column"
						gap="3"
						pt="2"
						pb={{ md: '10', lg: '0' }}
						px={{ base: '4', sm: '0' }}
						textAlign="justify"
					>
						<Text fontSize={{ base: 'sm', sm: 'md' }}>
							{translate('noMatterHowMuch')}
						</Text>
						<Text fontSize={{ base: 'sm', sm: 'md' }}>
							{translate('seeHowOurCrypto')}
						</Text>
						<Text fontSize={{ base: 'sm', sm: 'md' }}>
							{translate('optimizeYourPayroll')}
						</Text>
					</Flex>
					<Flex>
						<FeeCalculator />
					</Flex>
				</Flex>
				<Flex
					display={{ base: 'flex', sm: 'none' }}
					direction={{ base: 'column', lg: 'row' }}
					px={{ base: '0', sm: '4.563rem' }}
					justify="space-between"
					w="full"
					align="center"
					gap={
						locale === 'pt-BR'
							? { md: '6', lg: '8', xl: '0' }
							: { md: '1', lg: '2', xl: '28' }
					}
				>
					<Flex pb="10">
						<FeeCalculator />
					</Flex>
					<Flex
						direction="column"
						gap="3"
						pt="2"
						pb={{ base: '10', lg: '0' }}
						px={{ base: '4', sm: '0' }}
						textAlign="justify"
					>
						<Text fontSize={{ base: 'sm', sm: 'md' }}>
							{translate('noMatterHowMuch')}
						</Text>
						<Text fontSize={{ base: 'sm', sm: 'md' }}>
							{translate('seeHowOurCrypto')}
						</Text>
						<Text fontSize={{ base: 'sm', sm: 'md' }}>
							{translate('optimizeYourPayroll')}
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default PricingModelCard;

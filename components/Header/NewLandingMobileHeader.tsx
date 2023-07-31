import { Button, Flex, Img, Link } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { navigationPaths, usefulLinks } from 'utils';
import NextLink from 'next/link';
import useTranslation from 'next-translate/useTranslation';

export const NewLandingMobileHeader: React.FC = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('landing');

	return (
		<Flex
			pt="4"
			w="full"
			justify="space-between"
			align="center"
			bg="transparent"
		>
			<Link href={navigationPaths.landing} as={NextLink}>
				<Img minH="7" src="/images/logo-cali.svg" />
			</Link>
			<Link
				href={usefulLinks.joinOurWaitlist}
				textDecoration="none"
				_hover={{ textDecoration: 'none' }}
				as={NextLink}
				target="_blank"
			>
				<Button
					_hover={{ opacity: '80%' }}
					_focus={{
						border: '0.125rem solid white',
						color: 'white',
						bgColor: 'transparent',
					}}
					_active={{ color: 'black' }}
					_focusVisible={{}}
					_focusWithin={{}}
					borderRadius="base"
					bg={theme.text.black}
					border="0.125rem solid"
					borderColor="transparent"
					color={theme.text.white}
					px="9"
					fontSize="sm"
					fontWeight="normal"
					textDecoration="none"
				>
					{translate('launchApp')}
				</Button>
			</Link>
		</Flex>
	);
};

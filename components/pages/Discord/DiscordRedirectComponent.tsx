import { Flex, Img, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export const DiscordRedirectComponent = () => {
	const theme = usePicasso();
	const { t: translate } = useTranslation('banners');

	const [captcha, setCaptcha] = useState<string | null>('');

	return (
		<Flex
			bg={theme.bg.white}
			w="full"
			h="100vh"
			bgImage="/images/cali-discord-page-patern.svg"
			bgRepeat="no-repeat"
			bgPosition="left top"
			align="center"
			justify="center"
			p="24"
		>
			<Flex
				bg={theme.bg.gray2}
				w="full"
				h="full"
				align="center"
				justify="space-between"
			>
				<Img
					right="20"
					position="relative"
					src="/images/discord-example.svg"
					h="20.5rem"
					w="40rem"
				/>

				<Flex direction="column" w="full" h="full" justify="center">
					<Img src="/images/cali-icon.svg" h="3rem" w="5rem" />
					<Text
						color={theme.text.black}
						fontSize="5xl"
						fontWeight="bold"
						pt="4"
						pb="3"
					>
						{translate('joinOurDiscord')}
					</Text>
					<Text
						color={theme.text.black}
						fontSize="xl"
						fontWeight="medium"
						pb="4"
					>
						{translate('solveTheCaptcha')}
					</Text>
					{/* <ReCAPTCHA
						sitekey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_API_KEY!}
						style={{ height: '100px', width: '100px' }}
						onChange={value => setCaptcha(value)}
					/> */}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default DiscordRedirectComponent;

import { Button, Icon } from '@chakra-ui/react';
import { OffsetShadow } from 'components/OffsetShadow';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

export const NewCoinButton = () => {
	const { t: translate } = useTranslation('dashboard');
	const { locale } = useRouter();
	return (
		<OffsetShadow
			borderColor="white"
			position="absolute"
			buttonText={translate('newCoin')}
			px="5"
		>
			<Button
				position="relative"
				w="full"
				h="full"
				px="2"
				py="1"
				fontSize={locale === 'pt-BR' ? 'xs' : 'sm'}
				color="black"
				borderRadius="base"
				bg="white"
				_hover={{ background: 'white' }}
				_focus={{ background: 'white' }}
				_active={{
					background: 'white',
					transform: 'translateY(0.25rem) translateX(0.25rem)',
				}}
				bottom="0.25rem"
				right="0.25rem"
				fontWeight="medium"
				lineHeight="5"
				gap="2"
			>
				<Icon as={AiOutlinePlus} />
				{translate('newCoin')}
			</Button>
		</OffsetShadow>
	);
};

export default NewCoinButton;

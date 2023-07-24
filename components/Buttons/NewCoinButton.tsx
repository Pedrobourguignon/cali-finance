import { Button, Icon } from '@chakra-ui/react';
import { OffsetShadow } from 'components/OffsetShadow';
import { useAuth } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

interface ICoinButton {
	onOpen: () => void;
}

export const NewCoinButton: React.FC<ICoinButton> = ({ onOpen }) => {
	const { t: translate } = useTranslation('dashboard');
	const { locale } = useRouter();
	const { session } = useAuth();

	return (
		<OffsetShadow
			borderColor="white"
			top="0rem"
			left="0rem"
			width={{ base: 'full' }}
		>
			<Button
				position="relative"
				w={{
					base: 'full',
					md: locale === 'pt-BR' ? '6.938rem' : '5.625rem',
					xl: locale === 'pt-BR' ? '7.813rem' : '6.938rem',
				}}
				h="full"
				px={{ base: '5' }}
				py={{ base: '1.5' }}
				fontSize={{
					md: locale === 'pt-BR' ? 'xs' : 'xs',
					xl: locale === 'pt-BR' ? 'xs' : 'sm',
				}}
				color="black"
				borderRadius="base"
				bg="white"
				isDisabled={!session}
				_disabled={{ bg: 'white', cursor: 'not-allowed' }}
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
				gap="1.5"
				alignContent="center"
				onClick={onOpen}
			>
				<Icon as={AiOutlinePlus} />
				{translate('newCoin')}
			</Button>
		</OffsetShadow>
	);
};

export default NewCoinButton;

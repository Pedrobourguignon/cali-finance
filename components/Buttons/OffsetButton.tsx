import { Button, ButtonProps, Icon, IconProps } from '@chakra-ui/react';
import { OffsetShadow } from 'components';
import { usePicasso } from 'hooks';
import router, { useRouter } from 'next/router';

interface IOffsetButton extends ButtonProps {
	route: string;
	name: string;
	icon?: (props: IconProps) => JSX.Element;
}

export const OffsetButton: React.FC<IOffsetButton> = ({
	name,
	route,
	icon,
	...props
}) => {
	const theme = usePicasso();

	const handleClick = () => {
		router.push(route);
	};

	return (
		<OffsetShadow
			borderColor={props.disabled ? 'transparent' : 'white'}
			position="absolute"
			buttonText={name}
			px={{ md: '1', '2xl': '3' }}
		>
			<Button
				onClick={handleClick}
				px="3"
				position="absolute"
				bg="white"
				bottom="0.25rem"
				right="0.25rem"
				h="8"
				fontSize={{ md: 'sm', '2xl': 'md' }}
				fontWeight="medium"
				_hover={{ background: 'white' }}
				_focus={{ background: 'white' }}
				color={theme.text.black}
				borderRadius="base"
				_active={{
					background: 'white',
					transform: props.disabled
						? 'none'
						: 'translateY(0.25rem) translateX(0.25rem)',
				}}
				{...props}
			>
				{icon && <Icon as={icon} color={theme.text.black} mr="2" />}

				{name}
			</Button>
		</OffsetShadow>
	);
};

import { Button, ButtonProps, Icon, IconProps } from '@chakra-ui/react';
import { OffsetShadow } from 'components';
import { usePicasso } from 'hooks';
import Router, { useRouter } from 'next/router';

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
		Router.push(route);
	};

	return (
		<OffsetShadow borderColor="white" top="0rem" right="0rem">
			<Button
				onClick={handleClick}
				px="3"
				bg="white"
				bottom="0.25rem"
				right="0.25rem"
				w="max-content"
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

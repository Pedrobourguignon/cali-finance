import { Button, Icon, IconProps } from '@chakra-ui/react';
import { OffsetShadow } from 'components';
import { usePicasso } from 'hooks';
import Router from 'next/router';

interface IOffsetButton {
	route: string;
	name: string;
	icon?: (props: IconProps) => JSX.Element;
}

export const OffsetButton: React.FC<IOffsetButton> = ({
	name,
	route,
	icon,
}) => {
	const theme = usePicasso();

	const handleClick = () => {
		Router.push(route);
	};

	return (
		<OffsetShadow
			width={{ md: 28, lg: 36, xl: 40, '2xl': 44 }}
			height={{ md: 7, lg: 10, '2xl': 12 }}
			borderColor="white"
		>
			<Button
				onClick={handleClick}
				px={{ md: '3', lg: '5', xl: '7' }}
				position="absolute"
				bg="white"
				bottom="0.5rem"
				right="0.5rem"
				h={{ md: '7', lg: '10', '2xl': '12' }}
				fontSize={{ md: 'xs', lg: 'sm', xl: 'sm', '2xl': 'md' }}
				fontWeight="medium"
				_hover={{ background: 'white' }}
				_focus={{ background: 'white' }}
				color={theme.text.black}
				borderRadius="base"
				_active={{
					background: 'white',
					transform: 'translateY(0.5rem) translateX(0.5rem)',
				}}
			>
				{icon && <Icon as={icon} color={theme.text.black} mr="2" />}

				{name}
			</Button>
		</OffsetShadow>
	);
};

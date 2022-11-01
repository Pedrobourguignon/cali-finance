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
		<OffsetShadow width="36" height="10" buttonText="" borderColor="white">
			<Button
				onClick={handleClick}
				px="3"
				py="1.5"
				position="absolute"
				bg="white"
				bottom="0.5rem"
				right="0.5rem"
				fontSize="sm"
				fontWeight="medium"
				_hover={{ background: 'white' }}
				_focus={{ background: 'white' }}
				color="black"
				borderRadius="base"
				_active={{
					background: 'white',
					transform: 'translateY(0.5rem) translateX(0.5rem)',
				}}
			>
				{icon ? <Icon as={icon} color={theme.text.black} mr="2" /> : ''}

				{name}
			</Button>
		</OffsetShadow>
	);
};

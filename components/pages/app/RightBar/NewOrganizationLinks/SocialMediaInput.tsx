import { Img, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ISocialMediaInput } from 'types';

export const SocialMediaInput: React.FC<ISocialMediaInput> = ({
	imgSrc,
	link,
	placeHolder,
}) => (
	<InputGroup bg="whiteAlpha.200">
		<InputLeftElement
			pointerEvents="none"
			borderRightColor="whiteAlpha.200"
			borderRightWidth="0.1rem"
		>
			<Img src={imgSrc} />
		</InputLeftElement>
		<Input placeholder={link || placeHolder} />
	</InputGroup>
);

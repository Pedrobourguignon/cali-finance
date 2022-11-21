import { Img, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ISocialMediaInput } from 'types';

interface ISocialLink {
	socialLink: ISocialMediaInput;
}
export const SocialMediaInput: React.FC<ISocialLink> = ({ socialLink }) => (
	<InputGroup bg="whiteAlpha.200">
		<InputLeftElement
			pointerEvents="none"
			borderRightColor="whiteAlpha.200"
			borderRightWidth="0.1rem"
		>
			<Img src={socialLink.imgSrc} />
		</InputLeftElement>
		<Input
			placeholder={socialLink.link || socialLink.placeHolder}
			paddingInline="12"
		/>
	</InputGroup>
);

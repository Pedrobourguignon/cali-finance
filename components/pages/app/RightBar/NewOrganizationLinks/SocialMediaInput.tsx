import { Img, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ISocialMediaInput, ICreateOrganization } from 'types';
import { Controller, Control } from 'react-hook-form';

interface ISocialLink {
	socialLink: ISocialMediaInput;
	control: Control<ICreateOrganization>;
}
export const SocialMediaInput: React.FC<ISocialLink> = ({
	socialLink,
	control,
}) => (
	<Controller
		render={({ field }) => (
			<InputGroup {...field} bg="whiteAlpha.200">
				<InputLeftElement
					pointerEvents="none"
					borderRightColor="whiteAlpha.200"
					borderRightWidth="0.1rem"
				>
					<Img src={socialLink.imgSrc} />
				</InputLeftElement>
				<Input
					placeholder={socialLink.link || socialLink.placeHolder}
					_placeholder={{
						color: 'whiteAlpha.300	',
						fontSize: 'sm',
					}}
					fontSize="sm"
					bgColor="whiteAlpha.200"
					paddingInline="12"
					_hover={{}}
					borderColor="rgba(255, 255, 255, 0.08)"
				/>
			</InputGroup>
		)}
		name={socialLink.name}
		control={control}
	/>
);

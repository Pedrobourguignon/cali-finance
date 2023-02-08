import { Img, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ISocialMediaInput, ICreateCompany, IEditedCompany } from 'types';
import { Controller, Control } from 'react-hook-form';
import { useProfile } from 'hooks';

interface ISocialLink {
	socialLink: ISocialMediaInput;
	control: Control<ICreateCompany>;
	defaultValue?: string;
}
export const SocialMediaInput: React.FC<ISocialLink> = ({
	socialLink,
	control,
	defaultValue,
}) => {
	const { isConnected } = useProfile();
	return (
		<Controller
			render={({ field }) => (
				<InputGroup {...field} bg="whiteAlpha.200" h="8">
					<InputLeftElement
						h="8"
						pointerEvents="none"
						borderRightColor="whiteAlpha.200"
						borderRightWidth="0.1rem"
					>
						<Img src={socialLink.imgSrc} boxSize="6" />
					</InputLeftElement>
					<Input
						h="8"
						placeholder={socialLink.placeHolder}
						_placeholder={{
							color: 'whiteAlpha.300	',
							fontSize: 'sm',
						}}
						fontSize="sm"
						bgColor="whiteAlpha.200"
						paddingInline="12"
						_hover={{}}
						borderColor="rgba(255, 255, 255, 0.08)"
						defaultValue={defaultValue}
						disabled={!isConnected}
					/>
				</InputGroup>
			)}
			name={socialLink.name}
			control={control}
		/>
	);
};

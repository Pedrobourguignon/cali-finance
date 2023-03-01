import { Img, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ISocialMediaInput } from 'types';
import { useSession } from 'next-auth/react';
import { ISocialMedia } from 'types/interfaces/main-server/ICompany';
// eslint-disable-next-line import/no-unresolved
import { Dispatch, SetStateAction } from 'react';

interface ISocialLink {
	socialLink: ISocialMediaInput;
	defaultValue?: string;
	setSocialMediasData: Dispatch<SetStateAction<ISocialMedia[]>>;
}
export const SocialMediaInput: React.FC<ISocialLink> = ({
	socialLink,
	defaultValue,
	setSocialMediasData,
}) => {
	const { data: session } = useSession();
	return (
		<InputGroup bg="whiteAlpha.200" h="8">
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
				onChange={url =>
					setSocialMediasData(prevState =>
						prevState.concat([
							{ url: url.currentTarget.value, name: socialLink.name },
						])
					)
				}
				borderColor="rgba(255, 255, 255, 0.08)"
				defaultValue={defaultValue}
				disabled={!session}
			/>
		</InputGroup>
	);
};

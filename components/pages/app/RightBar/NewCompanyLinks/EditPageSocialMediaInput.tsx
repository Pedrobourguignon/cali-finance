/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Img, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ISociaLinksInputValue, ISocialMediaInput } from 'types';

import { Dispatch, SetStateAction } from 'react';
import { useAuth } from 'hooks';

interface ISocialLink {
	socialLink: ISocialMediaInput;
	defaultValue?: string;
	setEditedSocialLinksInputValue?: Dispatch<
		SetStateAction<ISociaLinksInputValue>
	>;
}

export const EditPageSocialMediaInput: React.FC<ISocialLink> = ({
	socialLink,
	defaultValue,
	setEditedSocialLinksInputValue,
}) => {
	const { session } = useAuth();

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
				onChange={url => {
					setEditedSocialLinksInputValue!(prevState => ({
						...prevState,
						[`${socialLink.name}URL`]: url.target.value,
					}));
				}}
				borderColor="rgba(255, 255, 255, 0.08)"
				defaultValue={defaultValue}
				disabled={!session}
			/>
		</InputGroup>
	);
};

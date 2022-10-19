/* eslint-disable react/no-children-prop */
import {
	Button,
	Flex,
	FormControl,
	Img,
	Input,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { ImageUploader } from './UploadImage';

const organizations = {
	name: 'Itatiaia',
	logo: 'data:image/png;base64,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',
	site: 'website.io',
	instagram: 'instagram/company',
	twitter: 'twitter.com/company',
	telegram: 't.me/company',
};
// eslint-disable-next-line consistent-return
const handleLogoImage = () => {
	if (!organizations.logo) return organizations.name.slice(0, 1);
};

export const NewOrganizationLinks = () => {
	const theme = usePicasso();
	return (
		<Flex>
			<Flex
				bg={theme.bg.black}
				direction="column"
				align="center"
				justify="center"
				px="4"
				py="24"
				gap="10"
			>
				<Flex direction="column" align="center" gap="4">
					{organizations.logo ? (
						<Img src={organizations.logo} boxSize="20" borderRadius="base" />
					) : (
						<Flex
							boxSize="20"
							color="black"
							bg={theme.bg.white2}
							borderRadius="base"
							align="center"
							justify="center"
							fontSize="4xl"
						>
							{handleLogoImage()}
						</Flex>
					)}
					<ImageUploader />
				</Flex>
				<Flex>
					<form>
						<FormControl>
							<Flex direction="column" gap="2">
								<InputGroup bg="whiteAlpha.200">
									<InputLeftElement
										pointerEvents="none"
										borderRightColor="whiteAlpha.200"
										borderRightWidth="0.1rem"
									>
										<Img src="/icons/globe.svg" />
									</InputLeftElement>
									<Input placeholder="website.io" />
								</InputGroup>
								<InputGroup bg="whiteAlpha.200">
									<InputLeftElement
										pointerEvents="none"
										borderRightColor="whiteAlpha.200"
										borderRightWidth="0.1rem"
									>
										<Img src="/icons/instagram.svg" />
									</InputLeftElement>
									<Input placeholder="instagram.com/company" />
								</InputGroup>

								<InputGroup bg="whiteAlpha.200">
									<InputLeftElement
										pointerEvents="none"
										borderRightColor="whiteAlpha.200"
										borderRightWidth="0.1rem"
									>
										<Img src="/icons/twitter.svg" />
									</InputLeftElement>
									<Input placeholder="twitter.com/company" />
								</InputGroup>
								<InputGroup bg="whiteAlpha.200">
									<InputLeftElement
										pointerEvents="none"
										borderRightColor="whiteAlpha.200"
										borderRightWidth="0.1rem"
									>
										<Img src="/icons/telegram.svg" />
									</InputLeftElement>
									<Input placeholder="t.me/company" />
								</InputGroup>
								<InputGroup bg="whiteAlpha.200">
									<InputLeftElement
										pointerEvents="none"
										borderRightColor="whiteAlpha.200"
										borderRightWidth="0.1rem"
									>
										<Img src="/icons/m-letter.svg" />
									</InputLeftElement>
									<Input placeholder="Placeholder" />
								</InputGroup>
							</Flex>
						</FormControl>
					</form>
				</Flex>
			</Flex>
		</Flex>
	);
};

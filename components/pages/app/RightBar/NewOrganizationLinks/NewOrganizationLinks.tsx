import {
	Flex,
	FormControl,
	Img,
	Input,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import { handleLogoImage } from 'utils';
import { ImageUploader } from 'components';

const organizations = {
	name: 'Itatiaia',
	logo: '/images/work.png',
	site: 'website.io',
	instagram: 'instagram/company',
	twitter: 'twitter.com/company',
	telegram: 't.me/company',
};

export const NewOrganizationLinks = () => {
	const theme = usePicasso();
	return (
		<Flex
			direction="column"
			gap="4"
			w="max-content"
			py="6"
			px="6"
			zIndex="docked"
		>
			<Flex
				bg={theme.bg.black}
				direction="column"
				align="center"
				justify="center"
				px="4"
				py="24"
				gap="10"
				borderRadius="base"
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
							{handleLogoImage(organizations.logo, organizations.name)}
						</Flex>
					)}
					<ImageUploader />
				</Flex>
				<Flex>
					<form>
						<FormControl>
							<Flex direction="column" gap="2" minW="72">
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

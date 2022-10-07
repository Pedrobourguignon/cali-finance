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

export const NewOrganizationLinks = () => {
	const theme = usePicasso();
	return (
		<Flex>
			<Flex
				bg={theme.bg.grey}
				direction="column"
				align="center"
				justify="center"
				px="4"
				py="24"
				gap="10"
			>
				<Flex direction="column" align="center" gap="4">
					<Img src="/images/work.png" boxSize="20" />
					<Button
						borderRadius="base"
						bg="black"
						fontSize="xs"
						fontWeight="medium"
						px="3"
						h="6"
					>
						Edit logo image
					</Button>
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

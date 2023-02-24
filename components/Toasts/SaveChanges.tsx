import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { OffsetShadow } from 'components';
import useTranslation from 'next-translate/useTranslation';
import { AiFillCheckCircle, AiOutlineClose } from 'react-icons/ai';

interface IToast {
	onClick: () => void;
}
export const SaveChangesToast: React.FC<IToast> = ({ onClick }) => {
	const { t: translate } = useTranslation('edit-profile');
	return (
		<OffsetShadow
			top="0.25rem"
			left="0.25rem"
			borderColor="green.500"
			bg="green.500"
		>
			<Flex
				bg="white"
				h="14"
				borderWidth="1px"
				borderColor="green.500"
				borderRadius="base"
				align="center"
				color="gray.700"
				gap="16"
				px="4"
			>
				<Flex gap="3" align="center">
					<Icon as={AiFillCheckCircle} color="green.500" boxSize="5" />
					<Text w="max-content">
						{translate('changesMadeWithSuccessfully')}
					</Text>
				</Flex>
				<Button onClick={onClick}>
					<Icon boxSize="5" as={AiOutlineClose} />
				</Button>
			</Flex>
		</OffsetShadow>
	);
};
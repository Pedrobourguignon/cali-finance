import { Button, Flex, FlexProps, Icon, Text } from '@chakra-ui/react';
import { OffsetShadow } from 'components';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import {
	AiOutlineClose,
	AiFillExclamationCircle,
	AiFillCheckCircle,
} from 'react-icons/ai';

interface IToast extends FlexProps {
	onClick: () => void;
	text: string;
	type: 'success' | 'error' | 'warning' | 'informative';
}
export const AlertToast: React.FC<IToast> = ({ onClick, text, type }) => {
	const { t: translate } = useTranslation('alerts');
	const theme = usePicasso();
	const handleToast = () => {
		if (type === 'error') {
			return {
				color: 'red.500',
				icon: AiFillExclamationCircle,
			};
		}
		if (type === 'success') {
			return {
				color: 'green.500',
				icon: AiFillCheckCircle,
			};
		}
		if (type === 'warning') {
			return {
				color: 'orange.500',
				icon: AiFillExclamationCircle,
			};
		}
		return {
			color: theme.branding.blue,
			icon: AiFillExclamationCircle,
		};
	};
	return (
		<OffsetShadow
			top="0.25rem"
			left="0.25rem"
			borderColor={handleToast().color}
			bg={handleToast().color}
		>
			<Flex
				bg="white"
				h="14"
				borderWidth="1px"
				borderColor={handleToast().color}
				borderRadius="base"
				align="center"
				color="gray.700"
				gap="16"
				px="4"
			>
				<Flex gap="3" align="center">
					<Icon
						as={handleToast().icon}
						color={handleToast().color}
						boxSize="5"
					/>
					<Text w="max-content">{translate(text)}</Text>
				</Flex>
				<Button onClick={onClick}>
					<Icon boxSize="5" as={AiOutlineClose} />
				</Button>
			</Flex>
		</OffsetShadow>
	);
};

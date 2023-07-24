import { Button, ButtonProps, Flex, Icon, Text } from '@chakra-ui/react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { usePicasso } from 'hooks';

interface IPaginatorProps extends ButtonProps {
	previous: () => void;
	next: () => void;
	actualPage: number;
	maxPage: number;
}

const PaginatorButton: FC<IPaginatorProps> = ({ children, ...props }) => {
	const theme = usePicasso();
	return (
		<Button
			border="1px solid"
			bg="white"
			{...props}
			color={theme.text.primary}
			size="xs"
			boxSize="6"
			_hover={{ opacity: 0.8 }}
			_active={{}}
			_focus={{}}
		>
			{children}
		</Button>
	);
};

export const Paginator: FC<IPaginatorProps> = ({
	actualPage,
	maxPage,
	previous,
	next,
}) => {
	const { t: translate } = useTranslation('dashboard');
	const theme = usePicasso();
	return (
		<Flex justifyContent="space-between" align="center" gap="2">
			<PaginatorButton
				isDisabled={actualPage === 1}
				onClick={previous}
				previous={previous}
				next={next}
				actualPage={actualPage}
				maxPage={maxPage}
			>
				<Icon as={AiOutlineLeft} />
			</PaginatorButton>
			<Text
				w="max-content"
				h="max-content"
				fontWeight="medium"
				color={theme.text.primary}
				fontSize="xs"
			>
				{`${actualPage} ${translate('of')} ${maxPage}`}
			</Text>
			<PaginatorButton
				isDisabled={actualPage === maxPage}
				onClick={next}
				previous={previous}
				next={next}
				actualPage={actualPage}
				maxPage={maxPage}
			>
				<Icon as={AiOutlineRight} />
			</PaginatorButton>
		</Flex>
	);
};

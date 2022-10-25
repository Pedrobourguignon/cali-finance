import { Button, ButtonProps, Flex, Icon, Text } from '@chakra-ui/react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import { FC } from 'react';

interface IPaginatorProps extends ButtonProps {
	previous: () => void;
	next: () => void;
	actualPage: number;
	maxPage: number;
}

const PaginatorPreviousButton: FC<IPaginatorProps> = ({
	previous,
	children,
	...props
}) => (
	<Button
		boxSize="7"
		border="1px solid"
		bg="white"
		aria-label="left-arrow"
		onClick={previous}
		{...props}
	>
		{children}
	</Button>
);

const PaginatorNextButton: FC<IPaginatorProps> = ({
	next,
	children,
	...props
}) => (
	<Button
		boxSize="7"
		border="1px solid"
		bg="white"
		aria-label="left-arrow"
		onClick={next}
		{...props}
	>
		{children}
	</Button>
);

export const Paginator: FC<IPaginatorProps> = ({
	actualPage,
	maxPage,
	previous,
	next,
}) => (
	<Flex justifyContent="space-between" align="center" gap="2">
		<PaginatorPreviousButton
			disabled={actualPage === 1}
			previous={previous}
			next={next}
			actualPage={actualPage}
			maxPage={maxPage}
		>
			<Icon as={AiOutlineLeft} />
		</PaginatorPreviousButton>
		<Text w="max-content" h="max-content" fontWeight="500">
			{actualPage} of {maxPage}
		</Text>
		<PaginatorNextButton
			disabled={actualPage === maxPage}
			next={next}
			previous={previous}
			actualPage={actualPage}
			maxPage={maxPage}
		>
			<Icon as={AiOutlineRight} />
		</PaginatorNextButton>
	</Flex>
);

import { Button, ButtonProps, Flex, Text } from '@chakra-ui/react';
import { usePicasso } from 'hooks';
import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';

interface IPaginatorProps {
	actualPage: number;
	maxPage: number;
}

const PaginatorButton: FC<ButtonProps> = ({ children, ...props }) => {
	const theme = usePicasso();

	return (
		<Button
			px="4"
			bgColor="transparent"
			borderWidth="0.1rem"
			borderStyle="solid"
			borderColor={theme.bg.card}
			{...props}
		>
			{children}
		</Button>
	);
};

export const Paginator: FC<IPaginatorProps> = props => {
	const { actualPage, maxPage } = props;
	const { t: translate } = useTranslation('teams-page');
	const theme = usePicasso();
	return (
		<Flex p="6" justifyContent="space-between" w="full" align="center">
			<PaginatorButton disabled={actualPage >= maxPage}>
				{translate('teamTable.paginator.previous')}
			</PaginatorButton>
			<Text w="max-content" h="max-content" fontWeight="medium">
				{translate('teamTable.paginator.text', {
					actualPage,
					maxPage,
				})}
			</Text>
			<PaginatorButton>{translate('teamTable.paginator.next')}</PaginatorButton>
		</Flex>
	);
};

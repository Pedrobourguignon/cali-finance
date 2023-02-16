import { Button } from '@chakra-ui/react';
import { IoIosArrowBack } from 'react-icons/io';
import router from 'next/router';
import { FC, ReactNode } from 'react';

interface INavigationBack {
	href: string;
	children?: ReactNode;
}

export const NavigationBack: FC<INavigationBack> = ({
	href,
	children,
	...rest
}) => {
	const handleClick = () => {
		router.push(href);
	};
	return (
		<Button
			px="0"
			h="6"
			color="gray.500"
			leftIcon={<IoIosArrowBack />}
			onClick={handleClick}
			lineHeight="6"
			fontWeight="medium"
			fontSize="md"
			{...rest}
		>
			{children}
		</Button>
	);
};

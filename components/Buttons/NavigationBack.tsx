import { Button } from '@chakra-ui/react';
import { IoIosArrowBack } from 'react-icons/io';
import Router from 'next/router';
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
		Router.push(href);
	};
	return (
		<Button
			px="0"
			color="gray.500"
			leftIcon={<IoIosArrowBack />}
			onClick={handleClick}
			fontSize="md"
			lineHeight="6"
			fontWeight="medium"
			{...rest}
		>
			{children}
		</Button>
	);
};

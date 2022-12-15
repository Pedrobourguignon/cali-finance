import { Button } from '@chakra-ui/react';
import { IoIosArrowBack } from 'react-icons/io';
import Router from 'next/router';
import { FC, ReactNode } from 'react';

interface INavigationBack {
	href: string;
	children?: ReactNode;
	fontSize: string;
	padding?: string;
}

export const NavigationBack: FC<INavigationBack> = ({
	href,
	children,
	fontSize,
	padding,
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
			fontSize={fontSize}
			lineHeight="6"
			fontWeight="medium"
			padding={padding}
			{...rest}
		>
			{children}
		</Button>
	);
};

import { Button } from '@chakra-ui/react';
import { IoIosArrowBack } from 'react-icons/io';
import Router from 'next/router';

export const BackToOrganizations = () => {
	const handleClick = () => {
		Router.push('/app/organizations');
	};
	return (
		<Button
			color="gray.500"
			leftIcon={<IoIosArrowBack />}
			onClick={handleClick}
		>
			Back to Organizations
		</Button>
	);
};

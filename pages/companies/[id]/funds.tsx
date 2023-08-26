import { useMediaQuery } from '@chakra-ui/react';
import { FundsContainer, FundsContainerMobile } from 'containers';

export const Funds = () => {
	const [isLargerThan767] = useMediaQuery('(min-width: 767px)', {
		fallback: true,
	});
	return isLargerThan767 ? <FundsContainer /> : <FundsContainerMobile />;
};

export default Funds;

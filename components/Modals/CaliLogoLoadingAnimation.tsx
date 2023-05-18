import React from 'react';
import { Img, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';

export const CaliLogoLoadingAnimation = () => {
	const prefersReducedMotion = usePrefersReducedMotion();

	const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

	const loadingAnimation = () => {
		const animation = prefersReducedMotion
			? undefined
			: `${spin} infinite 2s linear`;

		return (
			<Img animation={animation} src="/images/cali-logo.svg" w="16" h="10" />
		);
	};

	return loadingAnimation();
};

export default CaliLogoLoadingAnimation;

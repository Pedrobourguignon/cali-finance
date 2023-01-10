import { useRouter } from 'next/router';

export const usePath = () => {
	const { asPath } = useRouter();
	const isSamePath = (path: string) => asPath === path;
	return {
		asPath,
		isSamePath,
	};
};

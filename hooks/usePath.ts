import { useRouter } from 'next/router';

export const usePath = () => {
	const { pathname } = useRouter();

	const isSamePath = (path: string) => pathname === path;

	return {
		pathname,
		isSamePath,
	};
};

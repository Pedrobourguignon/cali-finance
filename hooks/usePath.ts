import { useRouter } from 'next/router';

export const usePath = () => {
	const { asPath, pathname } = useRouter();
	const isSamePath = (path: string) => asPath === path;
	const includesPath = (path: string) => pathname.includes(path);
	return {
		asPath,
		isSamePath,
		includesPath,
	};
};

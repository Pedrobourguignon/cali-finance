import { useRouter } from 'next/router';

export const usePath = () => {
	const { asPath } = useRouter();
	const router = useRouter();
	console.log(router);
	const isSamePath = (path: string) => {
		console.log(path);
		console.log(asPath);
		return asPath === path;
	};

	return {
		asPath,
		isSamePath,
	};
};

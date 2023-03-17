import { useRouter } from 'next/router';

export const usePath = () => {
	const { asPath, pathname } = useRouter();
	const isSamePath = (path: string) => asPath === path;
	return {
		asPath,
		isSamePath,
	};
};

// const { asPath, pathname } = useRouter();
// console.log(pathname);
// if (pathname.includes('[id]')) {
// 	const isSamePath = (path: string) => asPath === path;
// 	return {
// 		isSamePath,
// 		asPath,
// 	};
// }
// const isSamePath = (path: string) => asPath.includes(path);
// return { isSamePath, asPath };

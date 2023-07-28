import { NextRequest, NextResponse } from 'next/server';

export const config = {
	matcher: [
		'/',
		'/((?!_next/static|_next/image|images/|icons/|favicon.png).*)',
	],
};

export default async function middleware(req: NextRequest) {
	const url = req.nextUrl;
	// Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
	const hostname = req.headers.get('host');
	const { pathname, host } = url;
	const currentSubdomain = hostname?.split('.')[0];
	if (pathname.startsWith('/app')) {
		const newPath = pathname.replace('/app', '');
		const isLocal = hostname?.includes('localhost');
		return NextResponse.redirect(
			isLocal ? `http://app.${host}${newPath}` : `https://app.${host}${newPath}`
		);
	}
	if (currentSubdomain === 'app') {
		url.pathname = `/app${url.pathname}`;
		return NextResponse.rewrite(url);
	}
	return NextResponse.next();
}

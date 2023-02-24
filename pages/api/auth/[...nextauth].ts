import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	const providers = [
		CredentialsProvider({
			name: 'Ethereum',
			credentials: {
				message: {
					label: 'Message',
					type: 'text',
					placeholder: '0x0',
				},
				signature: {
					label: 'Signature',
					type: 'text',
					placeholder: '0x0',
				},
			},
			async authorize(credentials) {
				return null;
			},
		}),
	];

	return NextAuth(req, res, {
		providers,
		session: {
			strategy: 'jwt',
		},
		secret: process.env.NEXTAUTH_SECRET,
		callbacks: {},
	});
}

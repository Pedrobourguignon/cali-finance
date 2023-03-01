import { AUTH_SERVICE_ROUTES } from 'helpers';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authClient } from 'utils';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	const providers = [
		CredentialsProvider({
			name: 'Ethereum',
			credentials: {
				wallet: {},
				signature: {},
			},
			async authorize(credentials) {
				if (!credentials?.signature && !credentials?.wallet) {
					throw new Error('User not connected');
				}
				try {
					const wallet = credentials?.wallet;
					const signature = await credentials?.signature;
					const { data } = await authClient.post(
						AUTH_SERVICE_ROUTES.signature,
						{
							wallet,
							signature,
						}
					);
					const { jwt } = data;
					if (jwt) {
						return jwt;
					}
					return null;
				} catch (error: any) {
					throw new Error(error);
				}
			},
		}),
	];

	return NextAuth(req, res, {
		providers,
		session: {
			strategy: 'jwt',
		},
		callbacks: {
			async jwt({ token, user }) {
				if (user) {
					// eslint-disable-next-line no-param-reassign
					token.user = user;
				}
				return token;
			},
			async session({ session, token }) {
				// session.user = token.user; // please uncomment this line

				return session;
			},
		},
	});
}

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {},
			async authorize() {
				const user = { id: '', name: '', email: '' };
				if (user) {
					return user;
				}
				return null;
			},
		}),
	],
};
export default NextAuth(authOptions);

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		// CredentialsProvider({
		// 	type: 'credentials',
		// 	credentials: {},
		// 	authorize(credentials, req) {
		// 		if (credentials) return credentials;
		// 	},
		// }),
	],
};
export default NextAuth(authOptions);

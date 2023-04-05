import React, { createContext, useMemo, useEffect } from 'react';
import { AUTH_SERVICE_ROUTES } from 'helpers';
import { useSignMessage } from 'wagmi';
import { useToasty } from 'hooks';
import { signIn, useSession } from 'next-auth/react';
import { setCookie } from 'cookies-next';

interface IAuthContext {
	getSignature: (nonce: string) => Promise<`0x${string}` | undefined>;
	getNonce: (walletNumber: `0x${string}` | undefined) => Promise<any>;
	handleSignIn: (account: `0x${string}` | undefined) => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { data: session } = useSession();
	const { toast } = useToasty();
	const { signMessageAsync } = useSignMessage();

	const getNonce = async (walletNumber: `0x${string}` | undefined) => {
		try {
			if (!walletNumber) throw new Error('User not connected');
			const response = await fetch(AUTH_SERVICE_ROUTES.nonce(walletNumber));
			return response.json();
		} catch (error: any) {
			throw new Error(error);
		}
	};

	const getSignature = async (nonce: string) => {
		try {
			const signature = await signMessageAsync({
				message: nonce,
			});
			return signature;
		} catch (error: any) {
			if (error.message.includes('User rejected')) {
				toast({
					title: 'Error',
					description: 'The signature was cancelled. Please try again.',
					status: 'error',
				});
				// eslint-disable-next-line consistent-return
				return;
			}
			throw new Error(error);
		}
	};

	const handleSignIn = async (account: `0x${string}` | undefined) => {
		try {
			const { nonce } = await getNonce(account);
			const signature = await getSignature(nonce);
			if (signature) {
				signIn('credentials', {
					redirect: false,
					wallet: account,
					signature,
				});
			}
			return;
		} catch (error: any) {
			throw new Error(error);
		}
	};

	useEffect(() => {
		if (session) {
			setCookie('cali-finance-authorization', session.user);
			if (!localStorage.getItem('cali-finance-authorization')) {
				localStorage.setItem('cali-finance-authorization', session.user);
			}
		}
	}, [session]);

	const contextStates = useMemo(
		() => ({
			getNonce,
			getSignature,
			handleSignIn,
		}),
		[]
	);

	return (
		<AuthContext.Provider value={contextStates}>
			{children}
		</AuthContext.Provider>
	);
};

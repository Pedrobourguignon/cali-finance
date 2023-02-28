import React, { createContext, useState, useMemo, useEffect } from 'react';
import { AUTH_SERVICE_ROUTES } from 'helpers';
import { authClient } from 'utils';
import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { useToasty } from 'hooks';
import { signOut, useSession } from 'next-auth/react';

interface IAuthContext {
	// getAuthorization: () => Promise<void>;
	// getStoredAuthorization: () => Promise<string | void>;
	getSignature: (nonce: string) => Promise<void>;
	getNonce: (walletNumber: `0x${string}` | undefined) => Promise<any>;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { isConnected, address: wallet } = useAccount({
		onDisconnect() {
			signOut();
		},
	});
	const { disconnect } = useDisconnect();
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
			await signMessageAsync({
				message: nonce,
			});
		} catch (error: any) {
			if (error.message.includes('User rejected')) {
				toast({
					title: 'Error',
					description: 'The signature was cancelled. Please try again.',
					status: 'error',
				});
				disconnect();
				return;
			}
			throw new Error(error);
		}
	};

	// const getAuthorization = async () => {
	// 	try {
	// 		const { nonce } = await getNonce();
	// 		const signature = await getSignature(nonce);
	// 		const { data } = await authClient.post(AUTH_SERVICE_ROUTES.signature, {
	// 			wallet,
	// 			signature,
	// 		});
	// 		const { jwt } = data;
	// 		localStorage.setItem('cali-finance-authorization', jwt);
	// 	} catch (error: any) {
	// 		throw new Error(error);
	// 	}
	// };

	useEffect(() => {
		if (!localStorage.getItem('cali-finance-authorization')) {
			// localStorage.setItem('cali-finance-authorization', session!.user);
		}
	}, [session]);

	// const getStoredAuthorization = async () => {
	// 	try {
	// 		localStorage.getItem('cali-finance-authorization');

	// 		getAuthorization();
	// 	} catch (error: any) {
	// 		throw new Error(error);
	// 	}
	// };

	const contextStates = useMemo(
		() => ({
			// getStoredAuthorization,
			// getAuthorization,
			getNonce,
			getSignature,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return (
		<AuthContext.Provider value={contextStates}>
			{children}
		</AuthContext.Provider>
	);
};

import React, { createContext, useState, useMemo, useEffect } from 'react';
import { AUTH_SERVICE_ROUTES } from 'helpers';
import { authClient } from 'utils';
import { useAccount, useSignMessage } from 'wagmi';
import { useToasty } from 'hooks';

interface IAuthContext {
	isAuthorized: boolean;
	getAuthorization: () => Promise<void>;
	getStoredAuthorization: () => Promise<string | void>;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { isConnected, address: wallet } = useAccount();
	const { toast } = useToasty();
	const { signMessageAsync } = useSignMessage();

	const [isAuthorized, setIsAuthorized] = useState(false);

	const getNonce = async () => {
		try {
			if (!wallet) throw new Error('User not connected');
			const response = await fetch(AUTH_SERVICE_ROUTES.nonce(wallet));
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
				return;
			}
			throw new Error(error);
		}
	};

	const getAuthorization = async () => {
		try {
			const { nonce } = await getNonce();
			const signature = await getSignature(nonce);
			const { data } = await authClient.post(AUTH_SERVICE_ROUTES.signature, {
				wallet,
				signature,
			});
			const { jwt } = data;
			localStorage.setItem('cali-finance-authorization', jwt);
			setIsAuthorized(true);
		} catch (error: any) {
			throw new Error(error);
		}
	};

	const getStoredAuthorization = async () => {
		try {
			const authorization = localStorage.getItem('cali-finance-authorization');
			if (authorization) {
				setIsAuthorized(true);
				return;
			}
			getAuthorization();
		} catch (error: any) {
			throw new Error(error);
		}
	};

	useMemo(() => {
		if (typeof window === 'undefined') return;
		getStoredAuthorization();
	}, []);

	useEffect(() => {
		setIsAuthorized(isConnected);
	}, [isConnected]);

	const contextStates = useMemo(
		() => ({
			isAuthorized,
			getStoredAuthorization,
			getAuthorization,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isAuthorized]
	);

	return (
		<AuthContext.Provider value={contextStates}>
			{children}
		</AuthContext.Provider>
	);
};

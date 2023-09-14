import React, { createContext, useMemo, useEffect, useState } from 'react';
import {
	ConnectorData,
	useAccount,
	useDisconnect,
	useSignMessage,
	useWalletClient,
} from 'wagmi';
import { setCookie, deleteCookie } from 'cookies-next';
import { AUTH_SERVICE_ROUTES } from 'helpers';
import { authClient, checkJwt } from 'utils';
import { AlertToast } from 'components';
import { useToast } from '@chakra-ui/react';
import router from 'next/router';

interface IAuthContext {
	getSignature: (nonce: string) => Promise<`0x${string}` | undefined>;
	getNonce: (walletNumber: `0x${string}` | undefined) => Promise<any>;
	handleSignIn: (account: `0x${string}` | undefined) => Promise<void>;
	session: boolean;
	setSession: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { signMessageAsync } = useSignMessage();
	const [session, setSession] = useState(false);
	const { isConnected, connector: activeConnector } = useAccount();
	const toast = useToast();
	const { data: walletClient } = useWalletClient();
	const { disconnect } = useDisconnect();

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
				message: `Please, sign this message to proceed: ${nonce}`,
			});
			return signature;
		} catch (error: any) {
			if (error.message.includes('User rejected')) {
				toast({
					position: 'top-right',
					render: () => (
						<AlertToast
							onClick={toast.closeAll}
							text="signatureCanceled"
							type="error"
						/>
					),
				});

				// eslint-disable-next-line consistent-return
				return;
			}
			throw new Error(error);
		}
	};

	const checkSession = async () => {
		try {
			checkJwt();
			await authClient.get(AUTH_SERVICE_ROUTES.checkToken);
			setSession(true);
		} catch (error: any) {
			if (!toast.isActive('credentials-toast') && session) {
				toast({
					position: 'top-right',
					id: 'credentials-toast',
					render: () => (
						<AlertToast
							onClick={toast.closeAll}
							text="yourCredentials"
							type="error"
						/>
					),
				});
			}
		}
	};

	const handleSignIn = async (account: `0x${string}` | undefined) => {
		try {
			const { nonce } = await getNonce(account);
			const signature = await getSignature(nonce);
			if (signature) {
				const url = AUTH_SERVICE_ROUTES.signature;
				const { data } = await authClient.post(url, {
					wallet: account,
					signature,
				});
				if (data.jwt) {
					checkJwt(data.jwt);
					setCookie('cali-finance-authorization', data.jwt);
					localStorage.setItem('cali-finance-authorization', data.jwt);
					checkSession();
				}
			}
		} catch (error: any) {
			throw new Error(error);
		}
	};

	useEffect(() => {
		const handleConnectorUpdate = async ({ account }: ConnectorData) => {
			if (account) {
				setSession(false);
				deleteCookie('cali-finance-authorization');
				localStorage.removeItem('cali-finance-authorization');
				await handleSignIn(account);
				router.push('/dashboard');
			}
		};

		if (activeConnector) {
			activeConnector.on('change', handleConnectorUpdate);
		}

		return () => {
			activeConnector?.off('change', handleConnectorUpdate);
		};
	}, [activeConnector]);

	useEffect(() => {
		if (isConnected) {
			checkSession();
		}
		if ((!isConnected && !session) || !isConnected) router.push('/dashboard');
	}, [session, isConnected]);

	const contextStates = useMemo(
		() => ({
			getNonce,
			getSignature,
			handleSignIn,
			session,
			setSession,
		}),
		[session]
	);

	return (
		<AuthContext.Provider value={contextStates}>
			{children}
		</AuthContext.Provider>
	);
};

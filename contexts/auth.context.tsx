import React, { createContext, useMemo, useEffect, useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { useToasty } from 'hooks';
import { getCookie, setCookie } from 'cookies-next';
import { AUTH_SERVICE_ROUTES } from 'helpers';
import { authClient, checkJwt } from 'utils';
import { AlertToast } from 'components';
import { useToast } from '@chakra-ui/react';

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
	const toast = useToast();

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
					position: 'top',
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
			toast({
				position: 'top',
				render: () => (
					<AlertToast
						onClick={toast.closeAll}
						text="yourCredentials"
						type="error"
					/>
				),
			});
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
		checkSession();
	}, []);

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

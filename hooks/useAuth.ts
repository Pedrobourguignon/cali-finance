import { AUTH_SERVICE_ROUTES } from 'helpers';
import { authClient } from 'utils';
import { useAccount, useSignMessage } from 'wagmi';
import { useMemo } from 'react';
import { useToasty } from './useToasty';

export const useAuth = () => {
	const { address: wallet } = useAccount();
	const { toast } = useToasty();

	const { signMessageAsync } = useSignMessage();

	const getNonce = async () => {
		try {
			if (!wallet) throw new Error('User not connected');
			const response = await fetch(AUTH_SERVICE_ROUTES.nonce(wallet));
			console.log(response.json);
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
		} catch (error: any) {
			throw new Error(error);
		}
	};

	const getStoredAuthorization = async () => {
		try {
			const authorization = localStorage.getItem('cali-finance-authorization');
			if (authorization) {
				return authorization;
			}
			return getAuthorization();
		} catch (error: any) {
			throw new Error(error);
		}
	};

	// useMemo(() => {
	// 	getStoredAuthorization();
	// }, []);

	return { getAuthorization, getStoredAuthorization };
};

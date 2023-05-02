import { INotificationList, IWalletData } from 'types';
import { IUser } from 'types/interfaces/main-server/IUser';
import { mainClient } from 'utils';
import React, { createContext, useState, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { MAIN_SERVICE_ROUTES } from 'helpers';

interface IProfileContext {
	isLoading: boolean;
	isConnected: boolean;
	setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
	walletData: IWalletData;
	setWalletData: React.Dispatch<React.SetStateAction<IWalletData>>;
	updateProfile: (profileData: IUser) => Promise<void>;
	getProfileData: () => Promise<IUser>;
	getUserActivities: () => Promise<INotificationList[]>;
}

export const ProfileContext = createContext({} as IProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isConnected, setIsConnected] = useState(false);
	const { address: walletAddress } = useAccount();
	const [isLoading, setIsLoading] = useState(true);

	const [walletData, setWalletData] = useState<IWalletData>({
		name: '',
		icon: '',
	});

	const getProfileData = async () => {
		if (!walletAddress) throw new Error('User not connected');
		const response = await mainClient.get(
			MAIN_SERVICE_ROUTES.profileData(walletAddress)
		);
		return response.data;
	};

	const updateProfile = async (profileData: IUser) => {
		if (!walletAddress) throw new Error('User not connected');
		await mainClient.put(
			MAIN_SERVICE_ROUTES.profileData(walletAddress),
			profileData
		);
	};

	const getUserActivities = async () => {
		const response = await mainClient.get(
			MAIN_SERVICE_ROUTES.userRecentActivities,
			{
				params: {
					pageLimit: 4,
				},
			}
		);
		return response.data;
	};

	const contextStates = useMemo(
		() => ({
			isLoading,
			isConnected,
			setIsConnected,

			walletData,
			setWalletData,
			updateProfile,
			getProfileData,
			getUserActivities,
		}),
		[isLoading, isConnected, setIsConnected, walletData, setWalletData]
	);

	return (
		<ProfileContext.Provider value={contextStates}>
			{children}
		</ProfileContext.Provider>
	);
};

import { IWalletData } from 'types';
import { IUser } from 'types/interfaces/main-server/IUser';
import { mainClient } from 'utils';
import React, { createContext, useState, useMemo, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface IProfileContext {
	isLoading: boolean;
	isConnected: boolean;
	setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
	walletData: IWalletData;
	setWalletData: React.Dispatch<React.SetStateAction<IWalletData>>;
	updateProfile: (profileData: IUser) => Promise<void>;
	getProfileData: () => Promise<IUser>;
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
		const response = await mainClient.get(`/user/${walletAddress}`);
		return response.data;
	};

	const updateProfile = async (profileData: IUser) => {
		await mainClient.put(`/user/${walletAddress}`, profileData);
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
		}),
		[isLoading, isConnected, setIsConnected, walletData, setWalletData]
	);

	return (
		<ProfileContext.Provider value={contextStates}>
			{children}
		</ProfileContext.Provider>
	);
};

import React, { createContext, useState, useMemo } from 'react';
import { IWalletData } from 'types';
import { IUser } from 'types/interfaces/main-server/IUser';
import { mainClient } from 'utils';
import { useAccount } from 'wagmi';

interface IProfileContext {
	walletData: IWalletData;
	setWalletData: React.Dispatch<React.SetStateAction<IWalletData>>;
	updateUserSettings: (settings: {
		[setting: string]: unknown;
	}) => Promise<void>;
	updateProfile: (profileData: IUser) => Promise<void>;
	getProfileData: () => Promise<IUser>;
}

export const ProfileContext = createContext({} as IProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { address: walletAddress } = useAccount();

	const [walletData, setWalletData] = useState<IWalletData>({
		name: '',
		icon: '',
	});

	const getProfileData = async () => {
		const response = await mainClient.get(`/user/${walletAddress}`);
		return response.data;
	};

	const updateUserSettings = async (settings: {
		[setting: string]: unknown;
	}) => {
		await mainClient.put(`/user/${walletAddress}/settings`, { settings });
	};

	const updateProfile = async (profileData: IUser) => {
		await mainClient.put(`/user/${walletAddress}`, profileData);
	};
	const contextStates = useMemo(
		() => ({
			walletData,
			setWalletData,
			updateUserSettings,
			updateProfile,
			getProfileData,
		}),
		[walletData, setWalletData]
	);

	return (
		<ProfileContext.Provider value={contextStates}>
			{children}
		</ProfileContext.Provider>
	);
};

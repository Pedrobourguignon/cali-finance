import { MAIN_SERVICE_ROUTES } from 'helpers';
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
	getProfileData: (wallet: `0x${string}` | undefined) => Promise<any>;
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

	const getProfileData = async (wallet: `0x${string}` | undefined) => {
		if (!wallet) throw new Error('User not connected');
		const response = await mainClient.get(
			MAIN_SERVICE_ROUTES.profileData(wallet)
		);
		return response.data;
	};

	const updateUserSettings = async (settings: {
		[setting: string]: unknown;
	}) => {
		if (!walletAddress) throw new Error('User not connected');
		await mainClient.put(MAIN_SERVICE_ROUTES.userSettings(walletAddress), {
			settings,
		});
	};

	const updateProfile = async (profileData: IUser) => {
		if (!walletAddress) throw new Error('User not connected');
		await mainClient.put(
			MAIN_SERVICE_ROUTES.profileData(walletAddress),
			profileData
		);
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

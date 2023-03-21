import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ICoin, IProfile, IWalletData } from 'types';
import { IUser } from 'types/interfaces/main-server/IUser';
import { mainClient } from 'utils';
import { useAccount } from 'wagmi';

interface IProfileContext {
	isLoading: boolean;
	userProfile: IProfile;
	setUserProfile: React.Dispatch<React.SetStateAction<IProfile>>;
	editedProfileInfo: IProfile;
	setEditedProfileInfo: React.Dispatch<React.SetStateAction<IProfile>>;
	walletData: IWalletData;
	setWalletData: React.Dispatch<React.SetStateAction<IWalletData>>;
	updateUserSettings: (settings: {
		[setting: string]: ICoin[];
	}) => Promise<void>;
	getProfileData: () => Promise<IUser>;
}

export const ProfileContext = createContext({} as IProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { address: walletAddress } = useAccount();
	const [isLoading, setIsLoading] = useState(true);
	const [userProfile, setUserProfile] = useState<IProfile>({
		name: '',
		email: '',
		wallet: walletAddress,
		picture: '',
	});
	const [editedProfileInfo, setEditedProfileInfo] = useState<IProfile>({
		name: userProfile.name,
		email: userProfile.email,
		wallet: userProfile.wallet,
		picture: userProfile.picture,
	});
	const [walletData, setWalletData] = useState<IWalletData>({
		name: '',
		icon: '',
	});

	const getProfileData = async () => {
		const response = await mainClient.get(`/user/${walletAddress}`);
		return response.data;
	};

	const updateUserSettings = async (settings: {
		[setting: string]: ICoin[];
	}) => {
		await mainClient.put(`/user/${walletAddress}/settings`, { settings });
	};

	const contextStates = useMemo(
		() => ({
			isLoading,
			userProfile,
			setUserProfile,
			editedProfileInfo,
			setEditedProfileInfo,
			walletData,
			setWalletData,
			updateUserSettings,
			getProfileData,
		}),
		[
			isLoading,
			userProfile,
			setUserProfile,
			editedProfileInfo,
			setEditedProfileInfo,
			walletData,
			setWalletData,
		]
	);

	return (
		<ProfileContext.Provider value={contextStates}>
			{children}
		</ProfileContext.Provider>
	);
};

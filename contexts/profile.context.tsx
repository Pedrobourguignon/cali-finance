import React, { createContext, useState, useMemo } from 'react';
import { IProfile, IWalletData } from 'types';
import { useAccount } from 'wagmi';

interface IProfileContext {
	isLoading: boolean;
	isConnected: boolean;
	setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
	userProfile: IProfile;
	setUserProfile: React.Dispatch<React.SetStateAction<IProfile>>;
	editedProfileInfo: IProfile;
	setEditedProfileInfo: React.Dispatch<React.SetStateAction<IProfile>>;
	walletData: IWalletData;
	setWalletData: React.Dispatch<React.SetStateAction<IWalletData>>;
}

export const ProfileContext = createContext({} as IProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isConnected, setIsConnected] = useState(false);
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

	const contextStates = useMemo(
		() => ({
			isLoading,
			isConnected,
			setIsConnected,
			userProfile,
			setUserProfile,
			editedProfileInfo,
			setEditedProfileInfo,
			walletData,
			setWalletData,
		}),
		[
			isLoading,
			isConnected,
			setIsConnected,
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

import React, { createContext, useState, useMemo } from 'react';
import { IProfile, IWalletData } from 'types';

interface IProfileContext {
	isLoading: boolean;
	isConnected: boolean;
	setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
	userProfile: IProfile;
	setUserProfile: React.Dispatch<React.SetStateAction<IProfile>>;
	walletData: IWalletData;
	setWalletData: React.Dispatch<React.SetStateAction<IWalletData>>;
}

export const ProfileContext = createContext({} as IProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isConnected, setIsConnected] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [userProfile, setUserProfile] = useState<IProfile>({
		wallet: '0x6856...BF99',
		picture:
			'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRIJYVo526c4XTP0V4CyE2XbTLsdYcxSilLYaSDYC4XDtXArbTNxmX63MnX3gP6d2cI',
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
			walletData,
			setWalletData,
		}),
		[
			isLoading,
			isConnected,
			setIsConnected,
			userProfile,
			setUserProfile,
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

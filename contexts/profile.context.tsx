import React, { createContext, useState, useMemo } from 'react';
import { IProfile, IWalletData } from 'types';

interface IProfileContext {
	isLoading: boolean;
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
	const [isLoading, setIsLoading] = useState(true);
	const [userProfile, setUserProfile] = useState<IProfile>({
		name: '',
		email: '',
		wallet: '0x6856...BF99',
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
			userProfile,
			setUserProfile,
			editedProfileInfo,
			setEditedProfileInfo,
			walletData,
			setWalletData,
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

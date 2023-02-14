import React, { createContext, useState, useMemo } from 'react';
import { IProfile } from 'types';

interface IProfileData {
	name: string;
	photo: string;
	email: string;
}
interface IProfileContext {
	isLoading: boolean;
	isConnected: boolean;
	setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
	userProfile: IProfile;
	setUserProfile: React.Dispatch<React.SetStateAction<IProfile>>;
	editedProfileInfo: IProfile;
	setEditedProfileInfo: React.Dispatch<React.SetStateAction<IProfile>>;
}

export const ProfileContext = createContext({} as IProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isConnected, setIsConnected] = useState(true);
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

	const contextStates = useMemo(
		() => ({
			isLoading,
			isConnected,
			setIsConnected,
			userProfile,
			setUserProfile,
			editedProfileInfo,
			setEditedProfileInfo,
		}),
		[
			isLoading,
			isConnected,
			setIsConnected,
			userProfile,
			setUserProfile,
			editedProfileInfo,
			setEditedProfileInfo,
		]
	);

	return (
		<ProfileContext.Provider value={contextStates}>
			{children}
		</ProfileContext.Provider>
	);
};

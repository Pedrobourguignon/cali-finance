import React, { useEffect, createContext, useState, useMemo } from 'react';
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
}

export const ProfileContext = createContext({} as IProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isConnected, setIsConnected] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [userProfile, setUserProfile] = useState<IProfile>({
		wallet: '0x6856...BF99',
		picture:
			'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRIJYVo526c4XTP0V4CyE2XbTLsdYcxSilLYaSDYC4XDtXArbTNxmX63MnX3gP6d2cI',
	});

	const contextStates = useMemo(
		() => ({
			isLoading,
			isConnected,
			setIsConnected,
			userProfile,
			setUserProfile,
		}),
		[isLoading, isConnected, setIsConnected, userProfile, setUserProfile]
	);

	return (
		<ProfileContext.Provider value={contextStates}>
			{children}
		</ProfileContext.Provider>
	);
};

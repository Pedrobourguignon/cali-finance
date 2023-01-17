import React, { useEffect, createContext, useState, useMemo } from 'react';
import { IProfile } from 'types';

interface IProfileContext {
	isLoading: boolean;
	isConnected: boolean;
	setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
	userProfile: IProfile;
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

	const contextStates = useMemo(
		() => ({
			isLoading,
			isConnected,
			setIsConnected,
			userProfile,
		}),
		[isLoading, isConnected, setIsConnected, userProfile]
	);

	return (
		<ProfileContext.Provider value={contextStates}>
			{children}
		</ProfileContext.Provider>
	);
};

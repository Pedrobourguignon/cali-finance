import { MAIN_SERVICE_ROUTES } from 'helpers';
import { useAuth } from 'hooks';

import React, { createContext, useState, useMemo, useEffect } from 'react';
import { getNotifications } from 'services';
import {
	ICoin,
	IHistoryNotifications,
	INotificationList,
	ISelectedCoin,
	IWalletData,
} from 'types';
import { IUser } from 'types/interfaces/main-server/IUser';
import { db, mainClient } from 'utils';
import { useAccount } from 'wagmi';

interface IProfileContext {
	walletData: IWalletData;
	setWalletData: React.Dispatch<React.SetStateAction<IWalletData>>;
	updateUserSettings: (
		settings: {
			[setting: string]: unknown;
		},
		wallet: `0x${string}` | undefined
	) => Promise<void>;
	updateProfile: (profileData: IUser) => Promise<void>;
	getProfileData: (wallet: `0x${string}` | undefined) => Promise<any>;
	getUserActivities: (limit: number) => Promise<IHistoryNotifications[]>;
	setSelectedToken: React.Dispatch<React.SetStateAction<ISelectedCoin>>;
	setNotificationsList: React.Dispatch<
		React.SetStateAction<INotificationList[]>
	>;
	notificationsList: INotificationList[];
	selectedToken: ISelectedCoin;
	setCardItems: React.Dispatch<React.SetStateAction<ICoin[]>>;
	cardItems: ICoin[];
}

export const ProfileContext = createContext({} as IProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { address: walletAddress, isConnected } = useAccount();
	const [notificationsList, setNotificationsList] = useState<
		INotificationList[]
	>([]);

	const [walletData, setWalletData] = useState<IWalletData>({
		name: '',
		icon: '',
	});
	const [selectedToken, setSelectedToken] = useState<ISelectedCoin>(
		{} as ISelectedCoin
	);

	const [cardItems, setCardItems] = useState<ICoin[]>([]);
	const { session } = useAuth();

	const getProfileData = async (wallet: `0x${string}` | undefined) => {
		if (!wallet) throw new Error('User not connected');
		const response = await mainClient.get(
			MAIN_SERVICE_ROUTES.profileData(wallet)
		);
		return response.data;
	};

	const updateUserSettings = async (
		settings: {
			[setting: string]: unknown;
		},
		wallet: `0x${string}` | undefined
	) => {
		if (!wallet) throw new Error('User not connected');
		await mainClient.put(MAIN_SERVICE_ROUTES.userSettings(wallet), {
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

	const getUserActivities = async (limit: number) => {
		const response = await mainClient.get(
			MAIN_SERVICE_ROUTES.userRecentActivities,
			{
				params: {
					pageLimit: limit,
				},
			}
		);
		return response.data;
	};

	useEffect(() => {
		if (walletAddress) {
			const fetchNotifications = async () => {
				const recentActivities = await getNotifications(db, walletAddress);
				if (recentActivities)
					setNotificationsList(recentActivities?.notifications);
			};
			fetchNotifications();
		}
	}, []);

	const contextStates = useMemo(
		() => ({
			walletData,
			setWalletData,
			updateUserSettings,
			updateProfile,
			getProfileData,
			getUserActivities,
			setSelectedToken,
			setNotificationsList,
			notificationsList,
			selectedToken,
			setCardItems,
			cardItems,
		}),
		[
			walletData,
			updateProfile,
			notificationsList,
			selectedToken,
			cardItems,
			getProfileData,
			session,
		]
	);

	return (
		<ProfileContext.Provider value={contextStates}>
			{children}
		</ProfileContext.Provider>
	);
};

import { MAIN_SERVICE_ROUTES } from 'helpers';
import { useTokens } from 'hooks';
import React, { createContext, useState, useMemo, useEffect } from 'react';
import {
	QueryObserverResult,
	RefetchOptions,
	RefetchQueryFilters,
	useMutation,
	useQuery,
} from 'react-query';
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
	const { getCoinServiceTokens } = useTokens();
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

	// const [listOfTokens, setListOfTokens] = useState<ICoin[]>([]);

	// const symbols: string[] = [];

	const getProfileData = async (wallet: `0x${string}` | undefined) => {
		if (!wallet) throw new Error('User not connected');
		const response = await mainClient.get(
			MAIN_SERVICE_ROUTES.profileData(wallet)
		);
		return response.data;
	};

	// const {
	// 	data: userData,
	// 	refetch: refetchUserData,
	// 	isLoading: isLoadingUserData,
	// } = useQuery('get-user-data', () => getProfileData(walletAddress), {
	// 	enabled: !!isConnected,
	// });

	// const favoriteCoins = userData?.settings?.coin as ICoin[];

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
	// const { mutate } = useMutation(
	// 	(settings: { coin: ICoin[] }) =>
	// 		updateUserSettings(settings, walletAddress),
	// 	{
	// 		onSuccess: () => refetchUserData(),
	// 	}
	// );

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

	// const { data: coinServiceTokens, refetch: refetchCoinServiceTokens } =
	// 	useQuery(['get-coin-data'], () => getCoinServiceTokens(symbols.toString()));

	// useEffect(() => {
	// 	if (Object.keys(selectedToken).length !== 0) {
	// 		if (
	// 			!listOfTokens.find(
	// 				coin =>
	// 					coin.symbol.toLowerCase() === selectedToken.symbol.toLowerCase()
	// 			)
	// 		)
	// 			setListOfTokens(listOfTokens.concat(selectedToken));
	// 	}
	// }, [selectedToken]);

	// useEffect(() => {
	// 	if (favoriteCoins) {
	// 		listOfTokens.forEach(item => {
	// 			if (
	// 				!favoriteCoins.find(
	// 					coin => coin.symbol.toLowerCase() === item.symbol.toLowerCase()
	// 				)
	// 			) {
	// 				mutate({ coin: listOfTokens });
	// 			}
	// 		});
	// 	} else if (isLoadingUserData === false) {
	// 		mutate({ coin: listOfTokens });
	// 	}
	// }, [listOfTokens]);

	// checking if the token is already in the favorites list
	// const checkingAlreadyFavorite = () => {
	// 	if (!isLoadingUserData)
	// 		Object.values(favoriteCoins).forEach(item => {
	// 			symbols.push(item.symbol);
	// 			if (
	// 				!listOfTokens.find(
	// 					coin => coin.symbol.toLowerCase() === item.symbol.toLowerCase()
	// 				)
	// 			)
	// 				setListOfTokens(listOfTokens.concat(favoriteCoins));
	// 		});
	// };

	// // Put coin logo in object
	// const putLogoInCoin = () => {
	// 	if (coinServiceTokens) {
	// 		const tokens = Object.values(coinServiceTokens).reduce((acc, item) => {
	// 			if (item)
	// 				if (
	// 					!cardItems.find(
	// 						coin => coin.symbol.toLowerCase() === item.symbol.toLowerCase()
	// 					)
	// 				) {
	// 					if (favoriteCoins) {
	// 						const logo = Object.values(favoriteCoins).find(
	// 							token =>
	// 								token.symbol.toLowerCase() === item.symbol.toLowerCase()
	// 						);
	// 						acc.push({ ...item, ...logo });
	// 					}
	// 				}
	// 			return acc;
	// 		}, [] as ICoin[]);
	// 		setCardItems(cardItems.concat(tokens));
	// 	}
	// };

	// useEffect(() => {
	// 	if (
	// 		isLoadingUserData === false &&
	// 		(!favoriteCoins || favoriteCoins.length === 0)
	// 	) {
	// 		setListOfTokens([
	// 			{
	// 				symbol: 'eth',
	// 				logo: 'https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png',
	// 			},
	// 			{
	// 				symbol: 'busd',
	// 				logo: 'https://tokens.1inch.io/0x4fabb145d64652a948d72533023f6e7a623c7c53.png',
	// 			},
	// 			{
	// 				symbol: 'usdc',
	// 				logo: 'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
	// 			},
	// 		]);
	// 	} else {
	// 		checkingAlreadyFavorite();
	// 		refetchCoinServiceTokens();
	// 	}
	// }, [favoriteCoins, isLoadingUserData]);

	// useEffect(() => {
	// 	putLogoInCoin();
	// }, [coinServiceTokens]);

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
		[walletData, updateProfile, notificationsList, selectedToken, cardItems]
	);

	return (
		<ProfileContext.Provider value={contextStates}>
			{children}
		</ProfileContext.Provider>
	);
};

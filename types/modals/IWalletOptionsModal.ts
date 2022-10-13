import { IWalletData } from './IWalletData';

export interface IWalletOptionsModal {
	isOpen: boolean;
	onClose: () => void;
	openLoadingWalletModal: () => void;
	setWalletData: (wallet: IWalletData) => void;
}

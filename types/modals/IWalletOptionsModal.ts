import { IWalletData } from './IWalletData';

export interface IWalletOptionsModal {
	isOpen: boolean;
	onClose: () => void;
	openSecondModal: () => void;
	setWalletData: (wallet: IWalletData) => void;
}

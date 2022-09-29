import { IWalletData } from './IWalletData';

export interface IModal {
	isOpen: boolean;
	onClose: () => void;
	openSecondModal: () => void;
	setWalletData: (wallet: IWalletData) => void;
}

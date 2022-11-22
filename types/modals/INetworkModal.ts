import { INetwork } from 'types/INetwork';

export interface INetworkModal {
	networks: INetwork[];
	isOpen: boolean;
	onClose: () => void;
	setNetworkData: React.Dispatch<React.SetStateAction<INetwork>>;
}

export interface IBackground {
	children: React.ReactNode;
}

export interface IModal {
	isOpen: boolean;
	onClose: () => void;
}

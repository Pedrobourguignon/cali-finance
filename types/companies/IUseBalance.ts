export interface IUseBalance {
	decimals: number;
	formatted: number | string;
	symbol: string;
	value: {
		_hex: string;
		_isBigNumber: boolean;
	};
}

import { ISelectedCoin } from 'types';

export interface ICoin extends ISelectedCoin {
	value?: number;
	change?: number;
}

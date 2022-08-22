import axios, { AxiosInstance } from 'axios';

class CoingeckoService {
	static api: AxiosInstance = axios.create({
		baseURL: 'https://api.coingecko.com/api/v3/',
		withCredentials: false,
	});

	static async tokenInfoById(tokenId: string): Promise<string> {
		const url = `coins/${tokenId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`;
		try {
			const result = await this.api.get(url);
			return result?.data?.image?.thumb ?? '';
		} catch (error) {
			return '';
		}
	}

	static async tokenPriceVarianceById(tokenId: string): Promise<string> {
		const url = `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=1&interval=daily`;
		try {
			const result = await this.api.get(url);
			return result?.data?.prices;
		} catch (error) {
			return '';
		}
	}
}
export default CoingeckoService;

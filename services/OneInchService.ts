import axios, { AxiosInstance } from 'axios';

export class OneInchService {
	static api: AxiosInstance = axios.create({
		baseURL: 'https://api.1inch.io/v4.0/',
		withCredentials: false,
	});

	static async allTokensData() {
		const url = `1/tokens`;
		try {
			const result = await this.api.get(url);
			return result.data;
		} catch (error) {
			return '';
		}
	}
}

export default OneInchService;

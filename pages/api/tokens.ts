import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const client = axios.create({
		baseURL: 'https://api.1inch.dev/token',
		withCredentials: false,
		headers: {
			Authorization: `Bearer ${process.env.ONEINCH_API_KEY}`,
			accept: 'application/json',
		},
	});
	try {
		const url = '/v1.2/1/token-list';
		const response = await client.get(url);
		const { data } = response;
		res.status(200).json(data);
	} catch (error) {
		console.error('Erro ao buscar os dados:', error);
		res.status(500).json({ error: 'Erro ao buscar os dados da API.' });
	}
}

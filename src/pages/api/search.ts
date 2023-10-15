import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { SearchResultItemType, SearchResultType } from '@/types';
import { SearchQueryRepository } from '@/infra/repository/SearchQueryRepository';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<SearchResultType>
) {
	const searchQueryRepository = new SearchQueryRepository();
	const apiKey = process.env.API_KEY;
	const apiUrl = 'https://api.giphy.com/v1/gifs/search';
	const query = req.query.q;
	const limit = req.query.limit || 8;
	const offset = req.query.offset || 0;

	const response: any = await axios.get(apiUrl, {
		params: {
			api_key: apiKey,
			q: query,
			limit,
			offset,
		},
	});

	const { data } = response;

	const extractedData = extractData(data);

	await searchQueryRepository.save(
		query as string,
		data.pagination.total_count
	);

	res.status(200).json({
		items: extractedData,
		offset: data.pagination.offset,
		total: data.pagination.total_count,
	});
}

function extractData(data: any): SearchResultItemType[] {
	const extractedData = data.data.map((item: any) => ({
		id: item.id,
		title: item.title,
		url: item.images.downsized_medium.url,
	}));

	return extractedData;
}

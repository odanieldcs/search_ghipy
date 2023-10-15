import { SearchResultType } from '@/types';
import axios from 'axios';

export async function searchContent(
	query: string,
	offset?: number
): Promise<SearchResultType> {
	const apiUrl = 'http://localhost:3000/api/search';
	const limit = 8;

	const response: any = await axios.get(apiUrl, {
		params: {
			q: query,
			limit: limit,
			offset: offset || 0,
		},
	});

	const { data } = response;

	const result = {
		items: [],
		total: 0,
		offset: 0,
	};

	if (data && data.items.length > 0) {
		result.items = data.items;
		result.total = data.total;
		result.offset = data.offset;
	}

	return result;
}

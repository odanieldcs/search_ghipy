import axios from 'axios';
// function to get Data
export async function search(query: string): Promise<GifSearchResult> {
	const apiKey = 'pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa';
	const apiUrl = 'https://api.giphy.com/v1/gifs/search';
	const limit = 25;

	const response: any = await axios.get(apiUrl, {
		params: {
			api_key: apiKey,
			q: query,
			limit: limit,
		},
	});

	const extractedData = extractData(response.data);
	const totalPages = getPages(limit, response.data.pagination.total_count);

	return {
		items: extractedData,
		pages: totalPages ?? 0,
	};
}

function extractData(data: any): GifResult[] {
	const extractedData = data.data.map((item: any) => ({
		id: item.id,
		title: item.title,
		url: item.images.downsized_medium.url,
	}));

	return extractedData;
}

// function to extract pages to paginate
export function getPages(limit: number, total: number) {
	// retrieve total pages
	const pages = Math.ceil(total / limit);

	return pages;
}

type GifResult = {
	id: string;
	title: string;
	url: string;
};

export type GifSearchResult = {
	items: GifResult[];
	pages: number;
};

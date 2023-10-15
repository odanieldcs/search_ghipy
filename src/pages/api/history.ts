import type { NextApiRequest, NextApiResponse } from 'next';
import { SearchQueryRepository } from '@/infra/repository/SearchQueryRepository';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const searchQueryRepository = new SearchQueryRepository();

	const result = await searchQueryRepository.getHistory();

	res.status(200).json(result);
}

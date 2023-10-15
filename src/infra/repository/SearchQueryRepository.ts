import DatabaseConnection from '../database/prisma/client';

export class SearchQueryRepository {
	async save(query: string, results: number) {
		await DatabaseConnection.searchQuery.create({
			data: {
				query,
				results,
			},
		});
	}

	async getHistory() {
		const searchQuery = await DatabaseConnection.searchQuery.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});

		return searchQuery;
	}
}

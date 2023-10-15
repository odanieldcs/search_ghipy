import { useContext } from 'react';
import { AppSearchContext } from '@/pages/_app';
import { SearchResultList } from './SearchResultList';

export function SearchResult() {
	const { state } = useContext(AppSearchContext);
	const { searchResult } = state;

	const hasResult =
		searchResult !== undefined && searchResult?.items?.length > 0;

	return (
		<>
			{!hasResult && <p className="mb-4">No results found</p>}

			{hasResult && (
				<>
					<p className="mb-4">
						Listing {searchResult.items.length} of {searchResult.total} results
						found
					</p>
					<SearchResultList />
				</>
			)}
		</>
	);
}

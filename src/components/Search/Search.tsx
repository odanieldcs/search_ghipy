import { SearchHistory } from '../SearchHistory/SearchHistory';
import { SearchPagination } from '../SearchPagination/SearchPagination';
import { SearchResult } from '../SearchResult/SearchResult';
import { SearchForm } from './SearchForm';

export function Search() {
	return (
		<>
			<SearchForm>
				<SearchHistory />
			</SearchForm>
			<SearchResult />
			<SearchPagination />
		</>
	);
}

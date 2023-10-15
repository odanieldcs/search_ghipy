import { useContext } from 'react';
import styles from './SearchPagination.module.css';
import { AppSearchContext } from '@/pages/_app';
import { searchContent } from '@/services/SearchService';

export function SearchPagination(): JSX.Element {
	const { state, setState } = useContext(AppSearchContext);
	const { searchResult, querySearch } = state;

	async function updateSearchResult(query: string, offset: number) {
		const searchResult = await searchContent(query, offset);

		if (!searchResult) return;

		setState({
			...state,
			searchResult,
		});
	}

	function nextPage() {
		if (!searchResult) return;
		const offset = searchResult.offset + 8;
		updateSearchResult(querySearch, offset);
	}

	function prevPage() {
		if (!searchResult) return;
		if (searchResult.offset === 0) return;
		const offset = searchResult.offset - 8;
		updateSearchResult(querySearch, offset);
	}

	return (
		<>
			{searchResult.items.length > 0 && (
				<div className={styles.row}>
					{searchResult.offset > 0 && (
						<button className={styles.buttonPrevPage} onClick={prevPage}>
							Previous
						</button>
					)}
					<button className={styles.buttonNextPage} onClick={nextPage}>
						Next
					</button>
				</div>
			)}
		</>
	);
}

import { useContext, useState } from 'react';
import { AppSearchContext } from '@/pages/_app';
import { searchContent } from '@/services/SearchService';
import { SearchHistoryType } from '@/types';
import styles from './SearchForm.module.css';

export function SearchForm({ children }: { children: React.ReactNode }) {
	const [loading, setLoading] = useState(false);
	const { state, setState } = useContext(AppSearchContext);

	function updatedSearchQuery(query: string) {
		setState({
			...state,
			querySearch: query,
		});
	}

	function updateHistory(query: string, history: SearchHistoryType) {
		const queryNormalized = query.toLowerCase().replace(/\s/g, '-');
		const hasHistoryItem = history.items.find(
			(item) => item.id === queryNormalized
		);

		if (hasHistoryItem) return;

		history.items.push({
			id: queryNormalized,
			query: query,
		});

		return history;
	}

	async function onSubmit() {
		if (!state.querySearch) return;
		setLoading(true);
		let searchHistory = state.searchHistory;

		if (!searchHistory || !searchHistory.items) {
			searchHistory = {
				items: [
					{
						id: state.querySearch,
						query: state.querySearch,
					},
				],
			};
		} else {
			searchHistory = updateHistory(state.querySearch, searchHistory);
		}

		const searchResult = await searchContent(state.querySearch);

		if (!searchResult) return;

		setState({
			...state,
			searchHistory,
			searchResult,
		});
		setLoading(false);
	}

	function cleanSearchResult() {
		setState({
			...state,
			querySearch: '',
			searchResult: {
				items: [],
				offset: 0,
				total: 0,
			},
		});
	}

	return (
		<div className={styles.box}>
			<div className="flex relative">
				<input
					type="text"
					id="search"
					name="search"
					placeholder="Type here"
					value={state.querySearch || ''}
					onChange={(e) => updatedSearchQuery(e.target.value)}
					className={styles.input}
				/>
				<button
					onClick={onSubmit}
					className={styles.searchButton}
					disabled={loading}
				>
					Search
				</button>
				<a
					href="#"
					className={styles.cleanSearchResult}
					onClick={cleanSearchResult}
				>
					Clear search result
				</a>
			</div>
			{children}
		</div>
	);
}

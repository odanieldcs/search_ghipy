import { useContext } from 'react';
import { AppSearchContext } from '@/pages/_app';
import styles from './SearchHistoryList.module.css';

export function SearchHistoryList(): JSX.Element {
	const { state, setState } = useContext(AppSearchContext);

	function deleteHistoryItem(id: string) {
		if (!state.searchHistory) return;

		setState({
			...state,
			searchHistory: {
				...state.searchHistory,
				items: state.searchHistory.items.filter((item) => item.id !== id),
			},
		});
	}

	function updateSearchQuery(query: string) {
		if (!state.searchHistory) return;

		setState({
			...state,
			querySearch: query,
		});
	}

	return (
		<ul>
			{state.searchHistory?.items.map((search) => (
				<>
					<li key={search.id} className={styles.item}>
						<a href="#" onClick={() => updateSearchQuery(search.query)}>
							{search.query}
						</a>
						<button onClick={() => deleteHistoryItem(search.id)}>x</button>
					</li>
				</>
			))}
		</ul>
	);
}

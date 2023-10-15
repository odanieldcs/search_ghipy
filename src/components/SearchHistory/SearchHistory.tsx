import { useContext, useEffect, useState } from 'react';
import { AppSearchContext } from '@/pages/_app';
import { SearchHistoryList } from '@/components/SearchHistory/SearchHistoryList';
import styles from './SearchHistory.module.css';

export function SearchHistory(): JSX.Element {
	const [openSearchHistory, setOpenSearchHistory] = useState(false);
	const { state, setState } = useContext(AppSearchContext);

	useEffect(() => {
		const hasQuery = state.querySearch && state.querySearch?.length > 0;
		const hasHistory =
			state.searchHistory && state.searchHistory?.items.length > 0;

		if (hasQuery && hasHistory) {
			setOpenSearchHistory(true);
		} else {
			setOpenSearchHistory(false);
		}
	}, [state.querySearch, state.searchHistory]);

	function cleanHistory() {
		setState({
			...state,
			searchHistory: {
				items: [],
			},
		});
	}

	return (
		<>
			{openSearchHistory && (
				<>
					<div
						className={`${styles.box} ${
							openSearchHistory ? 'visible' : 'hidden'
						}`}
					>
						<div className={styles.header}>
							<p>Search history</p>
							<button onClick={() => setOpenSearchHistory(false)}>x</button>
						</div>
						<SearchHistoryList />
						<button
							className={styles.buttonCleanHistory}
							onClick={cleanHistory}
						>
							clean history
						</button>
					</div>
				</>
			)}
		</>
	);
}

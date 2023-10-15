import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { createContext, useState } from 'react';
import { SearchAppContext, SearchAppState } from '@/types';

export const AppSearchContext = createContext({} as SearchAppContext);

export default function App({ Component, pageProps }: AppProps) {
	const [state, setState] = useState<SearchAppState>({
		querySearch: '',
		searchHistory: { items: [] },
		searchResult: { items: [], offset: 0, total: 0 },
		openSearchHistory: false,
	});

	return (
		<AppSearchContext.Provider
			value={{
				state,
				setState,
			}}
		>
			<Component {...pageProps} />
		</AppSearchContext.Provider>
	);
}

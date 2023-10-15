export type SearchHistoryType = {
	items: SearchHistoryItemType[];
};

export type SearchHistoryItemType = {
	id: string;
	query: string;
};

export type SearchResultType = {
	items: SearchResultItemType[];
	total: number;
	offset: number;
};

export type SearchResultItemType = {
	id: string;
	title: string;
	url: string;
};

export type SearchAppState = {
	querySearch: string;
	searchHistory?: SearchHistoryType;
	searchResult: SearchResultType;
	openSearchHistory?: boolean;
};

export type SearchAppContext = {
	state: SearchAppState;
	setState: (state: SearchAppState) => void;
};

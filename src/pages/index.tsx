import { useState, useId } from 'react';
import { Inter } from 'next/font/google';
import { search, getPages, GifSearchResult } from '@/services/SearchService';

const inter = Inter({ subsets: ['latin'] });

type SearchHistory = {
	id: string;
	query: string;
};

export default function Home() {
	const [data, setData] = useState<GifSearchResult>({ pages: 0, items: [] });
	const [query, setQuery] = useState('');
	const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);

	function searchGifs() {
		const getData = async () => {
			if (!search) return;
			const queryNormalized = query.toLowerCase().replace(/\s/g, '-');

			setSearchHistory([
				...searchHistory,
				{
					id: queryNormalized,
					query: query,
				},
			]);
			const extractedData = await search(query);
			setData(extractedData);
		};

		getData();
	}

	function cleanHistory() {
		setSearchHistory([]);
	}

	function cleanHistoryItem(id: string) {
		setSearchHistory(searchHistory.filter((item) => item.id !== id));
	}

	return (
		<main
			className={`flex flex-col items-center justify-between p-24 ${inter.className}`}
		>
			<h1 className="mb-8">Acme GIF Search</h1>
			<div className="mb-4">
				<input
					type="text"
					placeholder="Type here"
					onChange={(e) => setQuery(e.target.value)}
					className="border border-gray-400 rounded-md outline-none px-4 py-3 text-neutral-800"
				/>
				<button
					onClick={searchGifs}
					className="px-4 py-3 bg-gray-200 ml-2 rounded-md text-neutral-800"
				>
					Search
				</button>
			</div>
			{searchHistory.length > 0 && (
				<div className="flex flex-col">
					<p className="text-gray-400">History</p>
					<ul className="flex gap-5 my-4">
						{searchHistory.map((search) => (
							<li key={search.id}>
								{search.query}
								<button
									className="bg-slate-700 px-1 rounded-md ml-2"
									onClick={() => cleanHistoryItem(search.id)}
								>
									x
								</button>
							</li>
						))}
					</ul>
					<button className="bg-slate-500 px-3 py-1" onClick={cleanHistory}>
						Clean History
					</button>
				</div>
			)}

			{data?.pages > 0 && (
				<>
					<h1 className="my-4">SEARCH RESULTS</h1>
					<div className="grid grid-cols-4 gap-8">
						{data.items.map((gif) => (
							<div key={gif.id}>
								<div className="rounded-md overflow-hidden mb-2">
									<img src={gif.url} alt={gif.title} />
								</div>
								<p className="text-center">{gif.title}</p>
							</div>
						))}
					</div>
				</>
			)}
			<div></div>
		</main>
	);
}

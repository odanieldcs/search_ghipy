import { Inter } from 'next/font/google';
import { Search } from '@/components/Search/Search';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<main className={`text-left p-8 max-w-7xl ${inter.className}`}>
			<h1 className="mb-8 text-lg">Acme GIF Search</h1>
			<Search />
		</main>
	);
}

import { useContext } from 'react';
import Image from 'next/image';
import { AppSearchContext } from '@/pages/_app';
import styles from './SearchResultList.module.css';

export function SearchResultList(): JSX.Element {
	const { state } = useContext(AppSearchContext);
	const { searchResult } = state;

	return (
		<div className={styles.box}>
			{searchResult?.items.map((gif) => (
				<div className={styles.picture} key={gif.id}>
					<Image
						quality={70}
						src={gif.url}
						alt={gif.title}
						fill
						sizes="(min-width: 300px) 50vw, 100vw"
						style={{
							objectFit: 'cover',
						}}
					/>
				</div>
			))}
		</div>
	);
}

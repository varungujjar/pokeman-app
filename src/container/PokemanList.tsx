import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector, RootState } from '../redux/store';
import { fetchPokemons } from '../redux/actions';
import { getIdFromUrl } from '../helpers';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import PokemanItem from '../components/PokemanItem';

const PokemanList = () => {
	const dispatchAction = useAppDispatch();
	const { pokemons } = useAppSelector((state: RootState) => {
		return state;
	});

	const [currentPageUrl, setCurrentPageUrl] = useState(pokemons ? pokemons.currentUrl : '');

	useEffect(() => {
		dispatchAction(fetchPokemons(currentPageUrl));
	}, [currentPageUrl, dispatchAction]);

	const gotoNextPage = () => {
		setCurrentPageUrl(pokemons.next);
	};
	const gotoPrevPage = () => {
		setCurrentPageUrl(pokemons.previous);
	};

	return (
		<React.Fragment>
			<div className="container">
				<header>
					<Link to="/">
						<img src="./logo.png" alt="pokeman-logo" className="logo" />
					</Link>
					{pokemons && (
						<Pagination gotoNextPage={pokemons.next && gotoNextPage} gotoPrevPage={pokemons.previous && gotoPrevPage} />
					)}
				</header>

				{pokemons.loading ? (
					<Loading />
				) : (
					<ul>
						{pokemons.results.map((pokemon: any) => (
							<PokemanItem key={getIdFromUrl(pokemon.url)} pokemon={pokemon} />
						))}
					</ul>
				)}
			</div>
		</React.Fragment>
	);
};

export default PokemanList;

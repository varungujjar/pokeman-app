import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from '../redux/actions';
import { getIdFromUrl } from '../helpers';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import PokemanItem from '../components/PokemanItem';

const PokemanList = () => {
	const [currentPageUrl, setCurrentPageUrl] = useState('');
	const dispatchAction = useDispatch();
	const { pokemons } = useSelector((state) => {
		return state;
	});

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
					<img src="./logo.png" alt="pokeman-logo" className="logo" />
					{pokemons && (
						<Pagination
							gotoNextPage={pokemons.next ? gotoNextPage : null}
							gotoPrevPage={pokemons.previous ? gotoPrevPage : null}
						/>
					)}
				</header>

				{pokemons === null ? (
					<Loading />
				) : (
					<ul>
						{pokemons.results.map((pokemon) => (
							<PokemanItem key={getIdFromUrl(pokemon.url)} pokemon={pokemon} />
						))}
					</ul>
				)}
			</div>
		</React.Fragment>
	);
};

export default PokemanList;

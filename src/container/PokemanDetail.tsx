import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector, RootState } from '../redux/store';
import { fetchPokemon } from '../redux/actions';
import { getImageUrl } from '../helpers';
import Loading from '../components/Loading';

const PokemanDetail = () => {
	const { id } = useParams() as any;
	const pokemonId = parseInt(id);

	const dispatchAction = useAppDispatch();
	const { selectedPokemon } = useAppSelector((state: RootState) => {
		return state;
	});

	useEffect(() => {
		dispatchAction(fetchPokemon(pokemonId));
	}, [dispatchAction, pokemonId]);

	return (
		<React.Fragment>
			<div className="container-detail">
				<header>
					<Link className="button" to="/">
						<img src="./logo.png" alt="pokeman-logo" className="logo" />
					</Link>
					<Link className="button" to="/">
						Go Back
					</Link>
				</header>

				{selectedPokemon.loading ? (
					<Loading />
				) : (
					<div className="pokemon-card">
						<img src={getImageUrl(pokemonId)} alt={selectedPokemon.forms[0].name} />
						<h1>{selectedPokemon.forms[0].name}</h1>
						<div>Base Experience : {selectedPokemon.base_experience}</div>
						<div>Height : {selectedPokemon.height}</div>
						<div>Weight : {selectedPokemon.weight}</div>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

export default PokemanDetail;

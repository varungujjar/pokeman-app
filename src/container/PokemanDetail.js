import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon } from '../redux/actions';
import { Link, useParams } from 'react-router-dom';
import { getImageUrl } from '../helpers';
import Loading from '../components/Loading';

const PokemanDetail = () => {
	const { id } = useParams();

	const dispatchAction = useDispatch();
	const { selectedPokemon } = useSelector((state) => {
		return state;
	});

	useEffect(() => {
		dispatchAction(fetchPokemon(id));
	}, [dispatchAction, id]);

	return (
		<React.Fragment>
			<div className="container-detail">
				<header>
					<img src="./logo.png" alt="pokeman-logo" className="logo" />
					<Link className="button" to="/">
						Go Back
					</Link>
				</header>

				{selectedPokemon.loading ? (
					<Loading />
				) : (
					<div className="pokemon-card">
						<img src={getImageUrl(id)} alt={selectedPokemon.forms[0].name} />
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

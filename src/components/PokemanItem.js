import { useState, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Link } from 'react-router-dom';
import { getImageUrl, getIdFromUrl } from '../helpers';
import { addFavourite, deleteFavourite } from '../redux/actions';

const PokemonItem = ({ pokemon, currentUrl }) => {
	const [favourite, setFavourite] = useState(false);
	const id = getIdFromUrl(pokemon.url);
	const name = pokemon.name;
	const imageUrl = getImageUrl(getIdFromUrl(pokemon.url));

	const store = useStore().getState();
	const isfavourites = store.favourites.includes(id);
	const dispatchAction = useDispatch();

	const onFavouriteHandler = (id) => {
		if (isfavourites) {
			dispatchAction(deleteFavourite(id));
			setFavourite(false);
		} else {
			dispatchAction(addFavourite(id));
			setFavourite(true);
		}
	};

	useEffect(() => {
		isfavourites ? setFavourite(true) : setFavourite(false);
	}, [isfavourites]);

	return (
		<li>
			<button className="button-favourite" onClick={() => onFavouriteHandler(id)}>
				{favourite ? (
					<img src="./heart.svg" alt="favourite-icon" />
				) : (
					<img src="./heart_outline.svg" alt="favourite-icon" />
				)}
			</button>
			<Link to={`/${id}`}>
				<img src={imageUrl} alt={name} />
				<span>{name}</span>
			</Link>
		</li>
	);
};

export default PokemonItem;

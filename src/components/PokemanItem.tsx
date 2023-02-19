import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getImageUrl, getIdFromUrl } from '../helpers/';
import { addFavourite, deleteFavourite } from '../redux/actions';

type PokemonItemProps = {
	pokemon: any;
};

const PokemonItem = ({ pokemon }: PokemonItemProps) => {
	const [favourite, setFavourite] = useState(false);
	const id = getIdFromUrl(pokemon.url);
	const name = pokemon.name;
	const imageUrl = getImageUrl(getIdFromUrl(pokemon.url));

	const favourites = useAppSelector((state) => state.favourites);

	const isfavourites = favourites.includes(id);
	const dispatchAction = useAppDispatch();

	const onFavouriteHandler = (id: number) => {
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
	}, []);

	return (
		<li>
			<button className="button-favourite" onClick={() => onFavouriteHandler(id)}>
				{favourite ? (
					<img src="./heart.svg" alt="favourite-icon" />
				) : (
					<img src="./heart_outline.svg" alt="unfavourite-icon" />
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

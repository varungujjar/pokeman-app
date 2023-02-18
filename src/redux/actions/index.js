import CONFIG from '../../config';
import axios from 'axios';

const memoAxios = (callback) => {
	const cache = new Map();
	return (...args) => {
		const selector = JSON.stringify(args);
		if (cache.has(selector)) return cache.get(selector);
		const value = callback(...args);
		cache.set(selector, value);
		return value;
	};
};

const axiosGet = memoAxios(axios.get);

export const addFavourite = (id) => {
	return {
		type: CONFIG.ACTION_ADD_FAV,
		payload: id,
	};
};

export const deleteFavourite = (id) => {
	return {
		type: CONFIG.ACTION_DEL_FAV,
		payload: id,
	};
};

export const fetchPokemons = (currentUrl) => async (dispatch) => {
	dispatch({
		type: CONFIG.ACTION_POKEMONS_LOADING,
	});
	if (!currentUrl) {
		currentUrl = `https://pokeapi.co/api/v2/pokemon?limit=${CONFIG.LIMIT}`;
	}
	try {
		await axiosGet(currentUrl).then((response) => {
			dispatch({
				type: CONFIG.ACTION_POKEMONS,
				payload: { ...response.data, currentUrl: currentUrl },
			});
		});
	} catch (error) {
		dispatch({
			error,
		});
	}
};

export const fetchPokemon = (id) => async (dispatch) => {
	dispatch({
		type: CONFIG.ACTION_POKEMON_LOADING,
	});
	try {
		await axiosGet(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
			dispatch({
				type: CONFIG.ACTION_POKEMON,
				payload: response.data,
			});
		});
	} catch (error) {
		dispatch({
			error,
		});
	}
};

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
		type: 'ADD_FAVOURITE',
		payload: id,
	};
};

export const deleteFavourite = (id) => {
	return {
		type: 'DELETE_FAVOURITE',
		payload: id,
	};
};

export const fetchPokemons = (currentUrl) => async (dispatch) => {
	const limit = 50;
	if (!currentUrl) {
		currentUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
	}
	try {
		await axiosGet(currentUrl).then((response) => {
			dispatch({
				type: 'POKEMONS',
				payload: response.data,
			});
		});
	} catch (error) {
		dispatch({
			error,
		});
	}
};

export const fetchPokemon = (id) => async (dispatch) => {
	try {
		await axiosGet(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
			dispatch({
				type: 'POKEMON',
				payload: response.data,
			});
		});
	} catch (error) {
		dispatch({
			error,
		});
	}
};

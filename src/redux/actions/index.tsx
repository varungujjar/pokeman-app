import CONFIG from '../../config';
import axios from 'axios';

const memoAxios = (callback: any) => {
	const cache = new Map();
	return (...args: any) => {
		const selector = JSON.stringify(args);
		if (cache.has(selector)) return cache.get(selector);
		const value = callback(...args);
		cache.set(selector, value);
		return value;
	};
};

const axiosGet = memoAxios(axios.get);

export const addFavourite = (id: number) => {
	return {
		type: CONFIG.ACTION_ADD_FAV,
		payload: id,
	};
};

export const deleteFavourite = (id: number) => {
	return {
		type: CONFIG.ACTION_DEL_FAV,
		payload: id,
	};
};

export const fetchPokemons = (currentUrl: string) => async (dispatch: any) => {
	dispatch({
		type: CONFIG.ACTION_POKEMONS_LOADING,
	});
	if (!currentUrl) {
		currentUrl = `https://pokeapi.co/api/v2/pokemon?limit=${CONFIG.LIMIT}`;
	}
	try {
		await axiosGet(currentUrl).then((response: any) => {
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

export const fetchPokemon = (id: number) => async (dispatch: any) => {
	dispatch({
		type: CONFIG.ACTION_POKEMON_LOADING,
	});
	try {
		await axiosGet(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response: any) => {
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

import { AnyAction } from 'redux';
import CONFIG from '../../config';

const pokemonsReducer = (state = { loading: true }, action: AnyAction) => {
	switch (action.type) {
		case CONFIG.ACTION_POKEMONS:
			return { ...state, ...action.payload, loading: false };
		case CONFIG.ACTION_POKEMONS_LOADING:
			return { ...state, loading: true };
		default:
			return state;
	}
};

export default pokemonsReducer;

import { AnyAction } from 'redux';
import CONFIG from '../../config';

const pokemonReducer = (state = { loading: true }, action: AnyAction) => {
	switch (action.type) {
		case CONFIG.ACTION_POKEMON:
			return { ...state, ...action.payload, loading: false };
		case CONFIG.ACTION_POKEMON_LOADING:
			return { ...state, loading: true };
		default:
			return state;
	}
};

export default pokemonReducer;

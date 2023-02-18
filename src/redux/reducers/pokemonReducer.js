import CONFIG from '../../config';

const pokemonReducer = (state, action) => {
	switch (action.type) {
		case CONFIG.ACTION_POKEMON:
			return { ...state, ...action.payload, loading: false };
		case CONFIG.ACTION_POKEMON_LOADING:
			return { ...state, loading: true };
		default:
			return { ...state, loading: true };
	}
};

export default pokemonReducer;

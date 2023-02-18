const pokemonReducer = (state = null, action) => {
	switch (action.type) {
		case 'POKEMON':
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

export default pokemonReducer;

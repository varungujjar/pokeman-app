const pokemonsReducer = (state = null, action) => {
	switch (action.type) {
		case 'POKEMONS':
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

export default pokemonsReducer;

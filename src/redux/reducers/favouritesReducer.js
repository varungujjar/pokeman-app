const favouritesReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_FAVOURITE':
			return [...state, action.payload];
		case 'DELETE_FAVOURITE':
			return state.filter((id) => id !== action.payload);
		default:
			return state;
	}
};

export default favouritesReducer;

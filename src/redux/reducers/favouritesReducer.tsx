import { AnyAction } from 'redux';
import CONFIG from '../../config';

const favouritesReducer = (state: Array<number> = [], action: AnyAction) => {
	switch (action.type) {
		case CONFIG.ACTION_ADD_FAV:
			return [...state, action.payload];
		case CONFIG.ACTION_DEL_FAV:
			return state.filter((id: number) => id !== action.payload);
		default:
			return state;
	}
};

export default favouritesReducer;

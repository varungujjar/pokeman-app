import { combineReducers } from 'redux';
import favouritesReducer from './favouritesReducer';
import pokemonReducer from './pokemonReducer';
import pokemonsReducer from './pokemonsReducer';

export default combineReducers({
	favourites: favouritesReducer,
	pokemons: pokemonsReducer,
	selectedPokemon: pokemonReducer,
});

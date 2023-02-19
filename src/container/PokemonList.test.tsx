import React from 'react';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { mockPokemonList } from './_mock_/index';
import { renderWithProviders } from '../utils/test-utils';
import PokemanList from './PokemanList';

//We need to intercept and mock Axios calls
jest.mock('axios');

//We need to mock Router calls because
//The Router isn't aware of what routes the links are attempting to link t that it is managing
jest.mock('react-router-dom', () => ({
	Link: (props: any) => {
		return <a {...props} href={props.to} />;
	},
}));

beforeEach(() => {
	jest.clearAllMocks();
});

const userSetup = () => {
	return userEvent.setup();
};

const fetchPokemons = () => {
	const mockedAxios = axios as jest.Mocked<typeof axios>;
	mockedAxios.get.mockResolvedValue(mockPokemonList);
};

const checkLoading = () => {
	expect(screen.queryByText(/Loading.../i)).toBeInTheDocument();
};

const renderPokemonList = () => {
	renderWithProviders(<PokemanList />);
};

const checkListItems = () => {
	const listItems = screen.getAllByRole('listitem');
	expect(listItems).toHaveLength(50);
	return listItems;
};

const refFavouriteButton = (item: any) => {
	const favouriteButton = within(item).getByRole('button');
	const favouriteImageIcon = within(favouriteButton).getByRole('img');
	return { favouriteButton, favouriteImageIcon };
};

describe('PokemanList Tests', () => {
	it('Fetch API to diplay 50 Pokemons', async () => {
		//Mock the axios get call with data
		fetchPokemons();

		//Render the PokemonList component with Providers
		renderPokemonList();

		//Should show an intial Loading text
		checkLoading();

		//Lets verify if the api call was made only once
		expect(axios.get).toHaveBeenCalledTimes(1);

		//Wait for the data to show up and verify if we found the
		//first name as bulbasaur on the list
		await waitFor(() => {
			expect(screen.queryByText(/bulbasaur/i)).toBeInTheDocument();

			//As per the document we need to show a list of 50 items on page
			checkListItems();
		});
	});

	it('Add Pokemon to Favourites', async () => {
		const user = userSetup();

		//Mock the axios get call with data
		fetchPokemons();

		//Render the PokemonList component with Providers
		renderPokemonList();

		//Should show an intial Loading text
		checkLoading();

		await waitFor(() => {
			const listItems = checkListItems();

			listItems.forEach(async (item) => {
				const { favouriteButton, favouriteImageIcon } = refFavouriteButton(item);

				//Expect to have unfavourited icon by default
				expect(favouriteImageIcon).toHaveAttribute('alt', 'unfavourite-icon');

				//User clicks on the favourite icon
				await user.click(favouriteButton);

				//Expect to have favourited icon
				expect(favouriteImageIcon).toHaveAttribute('alt', 'favourite-icon');
			});
		});
	});
	it('Remove Pokemon from Favourites', async () => {
		const user = userSetup();

		//Mock the axios get call with data
		fetchPokemons();

		//Render the PokemonList component with Providers
		renderPokemonList();

		//Should show an intial Loading text
		checkLoading();

		await waitFor(() => {
			const listItems = checkListItems();

			listItems.forEach(async (item) => {
				const { favouriteButton, favouriteImageIcon } = refFavouriteButton(item);

				//User clicks on the favourite icon
				await user.click(favouriteButton);

				//Expect to have favourited icon
				expect(favouriteImageIcon).toHaveAttribute('alt', 'favourite-icon');

				//User clicks to remove from favourites
				await user.click(favouriteButton);

				//Expect to have unfavourited icon by default
				expect(favouriteImageIcon).toHaveAttribute('alt', 'unfavourite-icon');
			});
		});
	});
});

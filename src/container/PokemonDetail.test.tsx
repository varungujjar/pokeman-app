import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { mockPokemonDetail } from './_mock_/index';
import { renderWithProviders } from '../utils/test-utils';
import PokemanDetail from './PokemanDetail';
//We need to intercept and mock Axios calls
jest.mock('axios');

//We need to mock Router calls because
//The Router isn't aware of what routes the links are attempting to link t that it is managing
jest.mock('react-router-dom', () => ({
	Link: (props: any) => {
		return <a {...props} href={props.to} />;
	},
	useParams: () => ({
		id: 3,
	}),
}));

beforeEach(() => {
	jest.clearAllMocks();
});

const fetchPokemon = () => {
	const mockedAxios = axios as jest.Mocked<typeof axios>;
	mockedAxios.get.mockResolvedValue(mockPokemonDetail);
};

const renderPokemon = () => {
	renderWithProviders(<PokemanDetail />);
};

const checkLoading = () => {
	expect(screen.queryByText(/Loading.../i)).toBeInTheDocument();
};

describe('PokemonDetail Tests', () => {
	it('Fetch API to diplay single Pokemon', async () => {
		//Mock the axios get call with data
		fetchPokemon();

		//Render the PokemonList component with Providers
		renderPokemon();

		//Should show an intial Loading text
		checkLoading();

		//Lets verify if the api call was made only once
		expect(axios.get).toHaveBeenCalledTimes(1);

		//Wait for the data to show up and verify if we found
		//title as venusaur on the list
		await waitFor(() => {
			expect(screen.queryByText(/venusaur/i)).toBeInTheDocument();
		});
	});
});

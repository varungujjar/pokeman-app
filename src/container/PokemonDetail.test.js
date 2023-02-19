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
	Link: (props) => {
		return <a {...props} href={props.to} />;
	},
	useParams: () => ({
		id: 3,
	}),
}));

beforeEach(() => {
	jest.clearAllMocks();
});

it('Test Pokemon Detail', async () => {
	const user = userEvent.setup();

	//Mock the axios get call with data
	axios.get.mockImplementation(() => {
		return Promise.resolve(mockPokemonDetail);
	});

	//Render the PokemonList component with Providers
	renderWithProviders(<PokemanDetail />);

	//Should show an intial Loading text
	expect(screen.queryByText(/Loading.../i)).toBeInTheDocument();

	//Lets verify if the api call was made only once
	expect(axios.get).toHaveBeenCalledTimes(1);

	//Wait for the data to show up and verify if we found
	//title as venusaur on the list
	await waitFor(() => {
		expect(screen.queryByText(/venusaur/i)).toBeInTheDocument();
	});
});

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import PokemanList from '../container/PokemanList';
import PokemanDetail from '../container/PokemanDetail';

const AppRoutes = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<PokemanList />} />
					<Route exact path="/:id" element={<PokemanDetail />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};

export default AppRoutes;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PokemanList from '../container/PokemanList';
import PokemanDetail from '../container/PokemanDetail';

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<PokemanList />} />
				<Route exact path="/:id" element={<PokemanDetail />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;

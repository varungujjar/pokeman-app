import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PokemanList from './container/PokemanList';
import PokemanDetail from './container/PokemanDetail';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PokemanList />} />
				<Route path="/:id" element={<PokemanDetail />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;

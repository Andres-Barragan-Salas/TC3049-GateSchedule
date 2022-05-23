import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { onIdTokenChanged } from 'firebase/auth';

import { auth } from './firebase-config';
import { setUser } from './store/slices/userSlice';
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/Header';
import store from './store/store';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
// import Movies from './screens/Movies';

import NotFound from './screens/NotFound';

import './App.css';

onIdTokenChanged(auth, async (authUser) => {
	store.dispatch(setUser({
		id: authUser?.uid ?? null,
		username: authUser?.displayName ?? null,
		email: authUser?.email ?? null,
		loading: false
	}));
})

function App() {
	const { loading, id } = useSelector(state => state.user);
	

	if (loading) {
		return (
			<div className="cinema-tec-app">
				<LoadingSpinner centered />
			</div>
		);
	}

	if (!id) {
		return (
			<div className="cinema-tec-app">
				<Routes>
					<Route exact path="/signup" element={<SignUp />} />
					<Route path="*" element={<Login />} />
				</Routes>
			</div>
		);
	}

	return (
		<div className="cinema-tec-app">
			<Header />
			<Routes>
				{/* <Route exact path="/" element={<Movies />} /> */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;

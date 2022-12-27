import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import logo from '../images/Vector.svg';

export function Header({ authorize, handleSignOut }) {
	const navigate = useNavigate();

	const signOut = () => {
		localStorage.removeItem('token');
		handleSignOut();
		navigate('/signin');
	};

	return (
		<header className='header'>
			<img className='header__logo' src={logo} alt='Логотип' />
			<Routes>
				<Route
					path='/signup'
					element={
						<Link className='header__link' to='/signin'>
							Войти
						</Link>
					}
				/>
				<Route
					path='/signin'
					element={
						<Link className='header__link' to='/signup'>
							Регистрация
						</Link>
					}
				/>
				<Route
					path='/'
					element={
						<div>
							<span className='header__user-info'>{authorize.email}</span>
							<button onClick={signOut} className='header__logout-btn' type='submit'>
								Выйти
							</button>
						</div>
					}
				/>
			</Routes>
		</header>
	);
}

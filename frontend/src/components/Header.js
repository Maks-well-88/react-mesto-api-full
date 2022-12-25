import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import logo from '../images/Vector.svg';

export function Header({ authorize, handleSignOut }) {
	const navigate = useNavigate();

	const signOut = () => {
		localStorage.removeItem('token');
		handleSignOut();
		navigate('/sign-in');
	};

	return (
		<header className='header'>
			<img className='header__logo' src={logo} alt='Логотип' />
			<Routes>
				<Route
					path='/sign-up'
					element={
						<Link className='header__link' to='/sign-in'>
							Войти
						</Link>
					}
				/>
				<Route
					path='/sign-in'
					element={
						<Link className='header__link' to='/sign-up'>
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

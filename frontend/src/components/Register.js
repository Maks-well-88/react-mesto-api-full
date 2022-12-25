import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

const Register = ({ onRegister }) => {
	const { values, setValues, handleChange } = useForm({ email: '', password: '' });

	const handleSubmit = e => {
		e.preventDefault();
		const { email, password } = values;
		onRegister(email, password, setValues);
	};

	return (
		<div className='main_type_auth'>
			<h1 className='main__title'>Регистрация</h1>
			<form onSubmit={handleSubmit} name='login-form' className='form form_type_auth'>
				<input
					className='form__input form__input_type_auth form__input_placeholder_auth'
					id='login'
					name='email'
					type='email'
					value={values.email}
					onChange={handleChange}
					placeholder='Email'
					autoComplete='off'
					required
				/>
				<input
					className='form__input form__input_type_auth form__input_placeholder_auth'
					id='password'
					name='password'
					type='password'
					value={values.password}
					onChange={handleChange}
					placeholder='Пароль'
					autoComplete='off'
					required
				/>
				<button className='form__button form__button_type_auth' type='submit'>
					Зарегистрироваться
				</button>
				<p className='form__text-register'>
					Уже зарегистрированы?{' '}
					<Link className='form__link-sign-in' to='/sign-in'>
						Войти
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;

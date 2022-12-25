import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { PopupWithForm } from './PopupWithForm';
import { useForm } from '../hooks/useForm';

export const EditProfilePopup = props => {
	const currentUser = useContext(CurrentUserContext);
	const { values, setValues, handleChange } = useForm({ name: '', description: '' });

	useEffect(() => {
		currentUser.name &&
			currentUser.about &&
			setValues({ name: currentUser.name, description: currentUser.about });
	}, [currentUser, setValues, props.isOpen]);

	const handleSubmit = e => {
		e.preventDefault();
		props.onUpdateUser({
			name: values.name,
			about: values.description,
		});
	};

	return (
		<PopupWithForm
			title={props.title}
			name={props.name}
			button={props.button}
			loadingButton={props.loadingButton}
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
			<input
				id='name-input'
				type='text'
				name='name'
				value={values.name}
				onChange={handleChange}
				className='popup__input-field popup__input-field_type_name'
				minLength='2'
				maxLength='40'
				placeholder='Имя'
				required
			/>
			<span className='name-input-error popup__input-error'></span>
			<input
				id='job-input'
				type='text'
				name='description'
				value={values.description}
				onChange={handleChange}
				className='popup__input-field popup__input-field_type_job'
				minLength='2'
				maxLength='200'
				placeholder='О себе'
				required
			/>
			<span className='job-input-error popup__input-error'></span>
		</PopupWithForm>
	);
};

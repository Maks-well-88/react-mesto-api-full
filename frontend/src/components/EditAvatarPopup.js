import React, { useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm';
import { useForm } from '../hooks/useForm';

export const EditAvatarPopup = props => {
	const { values, handleChange, setValues } = useForm({ avatar_url: '' });

	useEffect(() => setValues({ avatar_url: '' }), [props.isOpen, setValues]);

	const handleSubmit = e => {
		e.preventDefault();
		props.onUpdateAvatar(values.avatar_url);
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
				id='avatar-url-input'
				type='url'
				name='avatar_url'
				value={values.avatar_url}
				onChange={handleChange}
				placeholder='Ссылка на аватар'
				className='popup__input-field popup__input-field_placeholder_light popup__input-field_type_link'
				required
			/>
			<span className='avatar-url-input-error popup__input-error'></span>
		</PopupWithForm>
	);
};

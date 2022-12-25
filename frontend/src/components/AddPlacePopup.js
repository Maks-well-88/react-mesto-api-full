import { useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm';
import { useForm } from '../hooks/useForm';

export const AddPlacePopup = props => {
	const { values, handleChange, setValues } = useForm({ title: '', url: '' });

	useEffect(() => setValues({ title: '', url: '' }), [props.isOpen, setValues]);

	const handleSubmit = e => {
		e.preventDefault();
		props.onAddPlace({ name: values.title, link: values.url });
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
				id='title-input'
				type='text'
				name='title'
				value={values.title}
				onChange={handleChange}
				placeholder='Название'
				minLength='2'
				maxLength='30'
				className='popup__input-field popup__input-field_placeholder_light popup__input-field_type_title'
				required
			/>
			<span className='title-input-error popup__input-error'></span>
			<input
				id='url-input'
				type='url'
				name='url'
				value={values.url}
				onChange={handleChange}
				placeholder='Ссылка на картинку'
				className='popup__input-field popup__input-field_placeholder_light popup__input-field_type_link'
				required
			/>
			<span className='url-input-error popup__input-error'></span>
		</PopupWithForm>
	);
};

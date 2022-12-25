import React from 'react';
import { PopupWithForm } from './PopupWithForm';

export const ConfirmationPopup = props => {
	const handleSubmit = e => {
		e.preventDefault();
		props.onCardDelete(props.selectedCard);
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
		/>
	);
};

import React from 'react';

export const PopupWithForm = ({
	isOpen,
	onClose,
	onSubmit,
	button,
	name,
	title,
	loadingButton,
	children,
}) => {
	const handleCloseOverlayClick = e => e.target === e.currentTarget && onClose();

	return (
		<div
			className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}
			onClick={handleCloseOverlayClick}
		>
			<div className={`popup__container popup__container_${name}`}>
				<button type='button' className='popup__close' onClick={onClose}></button>
				<form name={`${name}-form`} className={`popup__form popup__form_type_${name}`} onSubmit={onSubmit}>
					<h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
					{children}
					<button type='submit' className={`popup__button-save popup__button-save_type_${name}`}>
						{loadingButton.isLoading ? loadingButton.name : button}
					</button>
				</form>
			</div>
		</div>
	);
};

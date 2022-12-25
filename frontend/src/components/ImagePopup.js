import React from 'react';

export function ImagePopup({ card, onClose }) {
	const handleCloseOverlayClick = e => e.target === e.currentTarget && onClose();

	return (
		<div
			className={card.display ? 'popup popup_type_image popup_opened' : 'popup popup_type_image'}
			onClick={handleCloseOverlayClick}
		>
			<div className='popup__image-wrapper'>
				<button type='button' className='popup__close' onClick={onClose}></button>
				<img src={card.link} alt={card.name} className='popup__image' />
				<h2 className='popup__image-title'>{card.name}</h2>
			</div>
		</div>
	);
}

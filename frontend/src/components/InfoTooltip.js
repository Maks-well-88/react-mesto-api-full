import success from '../images/Success.svg';
import unsuccess from '../images/Unsuccess.svg';

export const InfoTooltip = ({ infoTooltip, onClose, name }) => {
	const handleCloseOverlayClick = e => e.target === e.currentTarget && onClose();

	return (
		<div
			className={infoTooltip.isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}
			onClick={handleCloseOverlayClick}
		>
			<div className={'popup__container'}>
				<button type='button' className='popup__close' onClick={onClose}></button>
				<div className='popup__register'>
					<img
						className='popup__register-image'
						src={infoTooltip.success ? success : unsuccess}
						alt='Изображение со статусом регистрации'
					/>
					<p className='popup__register-text'>{infoTooltip.message}</p>
				</div>
			</div>
		</div>
	);
};

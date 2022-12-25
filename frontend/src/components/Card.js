import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
	const currentUser = useContext(CurrentUserContext);
	const isOwner = currentUser._id === card.owner._id;
	const isLiked = card.likes.some(user => user._id === currentUser._id);
	const handleImageClick = () =>
		onCardClick({ id: card._id, link: card.link, name: card.name, display: true });
	const handleLikeClick = () => onCardLike(card);
	const handleDeleteClick = () => {
		onCardClick(prevState => ({ ...prevState, _id: card._id }));
		onCardDelete();
	};

	return (
		<article className='element'>
			<img src={card.link} alt={card.name} className='element__image' onClick={handleImageClick} />
			<button
				type='button'
				onClick={handleDeleteClick}
				className={isOwner ? 'element__delete-btn element__delete-btn_active' : 'element__delete-btn'}
			></button>
			<div className='element__description'>
				<h2 className='element__title'>{card.name}</h2>
				<div className='element__like-wrapper'>
					<button
						type='button'
						onClick={handleLikeClick}
						className={isLiked ? 'element__like-btn element__like-btn_active' : 'element__like-btn'}
					></button>
					<span className='element__like-counter'>{card.likes.length}</span>
				</div>
			</div>
		</article>
	);
};

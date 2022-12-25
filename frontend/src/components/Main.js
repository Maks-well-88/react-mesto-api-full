import React, { useContext } from 'react';
import { Card } from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const Main = ({
	onEditProfile,
	onAddPlace,
	onEditAvatar,
	onCardClick,
	cards,
	onCardLike,
	onCardDelete,
}) => {
	const { avatar, about, name } = useContext(CurrentUserContext);

	return (
		<main className='main'>
			<section className='profile'>
				<div className='profile__avatar' onClick={onEditAvatar}>
					<img className='profile__avatar-image' src={avatar} alt='Аватар' />
				</div>
				<div className='profile__info'>
					<div className='profile__name-wrapper'>
						<h1 className='profile__name'>{name}</h1>
						<button type='button' className='profile__edit-button' onClick={onEditProfile}></button>
					</div>
					<p className='profile__job'>{about}</p>
				</div>
				<button type='button' className='profile__add-button' onClick={onAddPlace}></button>
			</section>
			<section className='elements' aria-label='Блок с карточками'>
				{cards.map(card => (
					<Card
						key={card._id}
						card={card}
						onCardDelete={onCardDelete}
						onCardLike={onCardLike}
						onCardClick={onCardClick}
					/>
				))}
			</section>
		</main>
	);
};

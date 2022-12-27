import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ImagePopup } from './ImagePopup';
import { EditProfilePopup } from './EditProfilePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { ConfirmationPopup } from './ConfirmationPopup';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { ProtectedRoute } from './ProtectedRoute';
import { InfoTooltip } from './InfoTooltip';
import { Main } from './Main';
import { auth } from '../utils/auth';

export function App() {
	const navigate = useNavigate();
	const [authorize, setAuthorize] = useState({ loggedIn: false });
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
	const [infoTooltip, setInfoTooltip] = useState({ isOpen: false, message: '' });
	const [selectedCard, setSelectedCard] = useState({ link: '', name: '', display: false });
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);
	const [loadingButton, setLoadingButton] = useState({ name: '', isLoading: false });
	const isOpen =
		isEditAvatarPopupOpen ||
		isEditProfilePopupOpen ||
		isAddPlacePopupOpen ||
		isConfirmationPopupOpen ||
		infoTooltip.isOpen ||
		selectedCard.display;

	useEffect(() => {
		const closeByEscape = e => e.key === 'Escape' && closeAllPopups();
		document.addEventListener('keydown', closeByEscape);
		return () => document.removeEventListener('keydown', closeByEscape);
	}, [isOpen]);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			const token = localStorage.getItem('token');
			auth
				.getContent(token)
				.then(response => {
					if (response) {
						const { email } = response;
						setAuthorize({ loggedIn: true, email: email });
						navigate('/');
					}
				})
				.catch(error => console.error(error));
		}
	}, [navigate]);

	useEffect(() => {
		authorize.loggedIn &&
			api
				.getInfo()
				.then(userData => setCurrentUser(userData))
				.catch(error => console.error(error)) &&
			api
				.renderInitialCards()
				.then(data => setCards(data))
				.catch(error => console.error(error));
	}, [authorize.loggedIn]);

	const handleCardClick = card => setSelectedCard(card);
	const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
	const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
	const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
	const handleDeleteButtonClick = () => setIsConfirmationPopupOpen(true);

	const closeAllPopups = () => {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsConfirmationPopupOpen(false);
		setSelectedCard(prevState => ({ ...prevState, display: false }));
	};

	const closeInfoTooltip = () => {
		const successState = infoTooltip.success;
		setInfoTooltip({ isOpen: false, message: '', success: successState });
		infoTooltip.success && navigate('/signin');
	};

	const handleUpdateUser = newProfileData => {
		setLoadingButton({ name: 'Обновляется...', isLoading: true });
		api
			.editProfile(newProfileData)
			.then(({ name, about }) => {
				setCurrentUser(prevState => ({ ...prevState, name, about }));
				setIsEditProfilePopupOpen(false);
			})
			.catch(error => console.error(error))
			.finally(() => setLoadingButton({ isLoading: false }));
	};

	const handleUpdateAvatar = avatarUrl => {
		setLoadingButton({ name: 'Обновляется...', isLoading: true });
		api
			.changeAvatarImage(avatarUrl)
			.then(({ avatar }) => {
				setCurrentUser(prevState => ({ ...prevState, avatar }));
				setIsEditAvatarPopupOpen(false);
			})
			.catch(error => console.error(error))
			.finally(() => setLoadingButton({ isLoading: false }));
	};

	const handleCardLike = card => {
		const isLiked = card.likes.some(user => user._id === currentUser._id);
		api
			.changeLikeStatusCard(card._id, isLiked)
			.then(newCard => {
				setCards(prevState => prevState.map(element => (element._id === card._id ? newCard : element)));
			})
			.catch(error => console.error(error));
	};

	const handleCardDelete = card => {
		setLoadingButton({ name: 'Удаление...', isLoading: true });
		api
			.removeCard(card._id)
			.then(() => {
				setCards(prevState => prevState.filter(element => element._id !== card._id));
				setIsConfirmationPopupOpen(false);
			})
			.catch(error => console.error(error))
			.finally(() => setLoadingButton({ isLoading: false }));
	};

	const handleAddPlaceSubmit = body => {
		setLoadingButton({ name: 'Добавляется...', isLoading: true });
		api
			.addNewCard(body)
			.then(newCard => {
				setCards([newCard, ...cards]);
				setIsAddPlacePopupOpen(false);
			})
			.catch(error => console.error(error))
			.finally(() => setLoadingButton({ isLoading: false }));
	};

	const handleSignOut = () => setAuthorize({ loggedIn: false });

	const handleLogin = (email, password, setValues) => {
		auth
			.authorize({ email, password })
			.then(data => data.token && localStorage.setItem('token', data.token))
			.then(() => {
				auth
					.getContent(localStorage.getItem('token'))
					.then(response => {
						if (response) {
							const { email } = response;
							setAuthorize({ loggedIn: true, email: email });
							navigate('/');
							setValues({ email: '', password: '' });
						}
					})
					.catch(error => console.error(error));
			})
			.catch(error => console.error(error));
	};

	const handleRegister = (email, password, setValues) => {
		auth
			.register({ email, password })
			.then(response => {
				if (response) {
					setValues({ email: '', password: '' });
					setInfoTooltip({ isOpen: true, message: 'Вы успешно зарегистрировались!', success: true });
				} else {
					setInfoTooltip({
						isOpen: true,
						message: 'Что-то пошло не так! Попробуйте ещё раз.',
						success: false,
					});
				}
			})
			.catch(error => console.error(error));
	};

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className='container'>
				<Header authorize={authorize} handleSignOut={handleSignOut} />
				<Routes>
					<Route
						path='/'
						element={
							<ProtectedRoute
								component={Main}
								authorize={authorize}
								onEditProfile={handleEditProfileClick}
								onAddPlace={handleAddPlaceClick}
								onEditAvatar={handleEditAvatarClick}
								onCardClick={handleCardClick}
								onCardLike={handleCardLike}
								onCardDelete={handleDeleteButtonClick}
								cards={cards}
							/>
						}
					/>
					<Route path='/signup' element={<Register onRegister={handleRegister} />} />
					<Route path='/signin' element={<Login onLogin={handleLogin} />} />
					<Route path='*' element={authorize.loggedIn ? <Navigate to='/' /> : <Navigate to='/signin' />} />
				</Routes>
				<Footer />
			</div>

			<ImagePopup card={selectedCard} onClose={closeAllPopups} />

			<InfoTooltip infoTooltip={infoTooltip} onClose={closeInfoTooltip} name={'info-tooltip'} />

			<EditProfilePopup
				title={'Редактировать профиль'}
				name={'profile'}
				button={'Сохранить'}
				loadingButton={loadingButton}
				isOpen={isEditProfilePopupOpen}
				onClose={closeAllPopups}
				onUpdateUser={handleUpdateUser}
			/>

			<EditAvatarPopup
				title={'Обновить аватар'}
				name={'avatar'}
				button={'Обновить'}
				loadingButton={loadingButton}
				isOpen={isEditAvatarPopupOpen}
				onClose={closeAllPopups}
				onUpdateAvatar={handleUpdateAvatar}
			/>

			<ConfirmationPopup
				title={'Вы уверены?'}
				name={'confirmation'}
				button={'Да'}
				isOpen={isConfirmationPopupOpen}
				onClose={closeAllPopups}
				onCardDelete={handleCardDelete}
				selectedCard={selectedCard}
				loadingButton={loadingButton}
			/>

			<AddPlacePopup
				title={'Новое место'}
				name={'new-place'}
				button={'Создать'}
				loadingButton={loadingButton}
				isOpen={isAddPlacePopupOpen}
				onClose={closeAllPopups}
				onAddPlace={handleAddPlaceSubmit}
			/>
		</CurrentUserContext.Provider>
	);
}

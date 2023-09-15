import React, {useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import {Route, Routes, useNavigate} from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import auth from '../utils/Аuthorization'; 
import InfoTooltip from './InfoTooltip';


function App() {
    const [email, setEmail] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isResponseFail, setIsResponseFail] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [idCardForDelete, setIdCardForDelete] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (loggedIn) {
            Promise.all([
                api.receiveUserInfo(localStorage.jwt),
                api.receiveCardsInfo(localStorage.jwt),
            ])
                .then(([userData, cardsData]) => {
                    setCurrentUser(userData);
                    setCards(cardsData);
                })
                .catch((error) => {
                    console.log(
                        `Ошибка получения данных пользователя и карт - ${error}`
                    );
                });
        }
    }, [loggedIn]);

    function handleSignOut() {
        localStorage.removeItem('jwt');
        setEmail(null);
        setLoggedIn(false);
        navigate("/sign-in", {replace: true})
    }

    function showInfoTooltip(isError, err = null) {
        if (err) console.log(err);
        setIsResponseFail(isError);
        setIsInfoTooltipOpen(true);
    }

    function handleRegister(formData) {
        auth
          .registration(formData)
          .then((data) => {
            if (data) {
                showInfoTooltip(false);
                navigate("/sign-in", {replace: true})    
            }
          })
          .catch((err) => showInfoTooltip(true, err));
      }

      function handleLogin(formData) {
        auth
            .authorization(formData)
            .then((data) => {
                if (data && data.token) {
                    localStorage.setItem('jwt', data.token);
                    setLoggedIn(true);
                    setEmail(formData.email);
                    navigate("/", {replace: true})
                }
            })
          .catch((err) => showInfoTooltip(true, err));
        }


    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(selectedCard) {
        setSelectedCard(selectedCard);
        setIsImagePopupOpen(true);
    }

    function handleCardDelete(card) {
        setIdCardForDelete(card._id);
        setIsConfirmDeletePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsConfirmDeletePopupOpen(false);
        setIsImagePopupOpen(false);
        setSelectedCard({});
        setIsLoading(false);
        setIsInfoTooltipOpen(false);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked, localStorage.jwt)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
            console.log('handleCardLike', err);
        });
    }

    function handleDeleteCardSubmit(){
        setIsLoading(true)
        api.deleteCard(idCardForDelete, localStorage.jwt)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== idCardForDelete));
            closeAllPopups();
        })
        .catch((err) => {
            console.log('handleCardDelete', err);
        })
        .finally(() => {
            setIdCardForDelete(null);
        })
    }

    function handleUpdateUser(user) {
        setIsLoading(true)
        api.editProfileInfo(user, localStorage.jwt)
        .then((newUser) => {
            setCurrentUser(newUser);
            closeAllPopups();
        })
        .catch((err) => {
            console.log('handleUpdateUser', err);
        });
    }

    function handleUpdateAvatar(avatar) {
        setIsLoading(true)
        api.changeAvatar(avatar, localStorage.jwt)
        .then((data) => {
            setCurrentUser(data);
            closeAllPopups();
        })
        .catch((err) => {
            console.log('handleUpdateAvatar', err);
        });
    };

    function handleAddPlaceSubmit(place) {
        setIsLoading(true)
        api.createNewCard(place, localStorage.jwt)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch((err) => {
            console.log('handleAddPlaceSubmit', err);
        });
    }

    useEffect(() => {
        tokenCheck();
    }, []);

    const tokenCheck = () => {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            if (jwt) {
                auth.checkToken(jwt)
                    .then((res) => {
                        if (res) {
                            setLoggedIn(true);
                            setEmail(res.data.email);
                            navigate('/', { replace: true });
                        }
                    })
                    .catch((error) => {
                        console.log(`Ошибка проверки токена - ${error}`);
                    });
            }
        }
    };

  return (
    <div className="app">
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header userEmail={email} loggedIn={loggedIn} onSignOut={handleSignOut}
                />
                <Routes>
                    <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
                    <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
                    <Route path="/" element={<ProtectedRouteElement element={Main} 
                    loggedIn={loggedIn} 
                    onEditAvatar = {handleEditAvatarClick}
                    onEditProfile = {handleEditProfileClick}
                    onAddPlace = {handleAddPlaceClick}
                    onCardClick = {handleCardClick}
                    onCardLike={handleCardLike}
                    cards = {cards}
                    onCardDelete = {handleCardDelete}/>}
                    />  
                </Routes>
                <Footer />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading}/>
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading}/>
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit} isLoading={isLoading}/>
                <ConfirmDeletePopup isOpen={isConfirmDeletePopupOpen} onClose = {closeAllPopups} onConfirmDeleteCard = {handleDeleteCardSubmit} isLoading={isLoading}/>              
                <ImagePopup card = {selectedCard} isOpen={isImagePopupOpen} onClose = {closeAllPopups} />
                <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isResponseFail={isResponseFail}/>
            </div>
        </CurrentUserContext.Provider>  
    </div>
    );
}

export default App;

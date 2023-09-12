import React, {useContext} from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
   const {onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete, loggedIn} = props;

    const currentUser = useContext(CurrentUserContext);

    const cardsList = cards.map((data) =>  
      (<Card card = {data} onCardClick = {onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={data._id}/>)
    )

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__persona">
                    <a href='#' className="profile__avatar-edit" onClick={onEditAvatar}>
                        <img src={currentUser.avatar} alt="фотография пользователя" className="profile__avatar" />
                    </a>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={onEditProfile}>
                        </button>
                        <p className="profile__status">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace}>
                </button>
            </section>
            <section className="elements place-container">
                {cardsList}
            </section>
        </main>
    );
}

export default Main;
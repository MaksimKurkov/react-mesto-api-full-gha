import React, {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props){
    const {card, onCardClick, onCardLike, onCardDelete} = props;
    const currentUser = useContext(CurrentUserContext);
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const isOwn = card.owner._id === currentUser._id;


    function handleClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    return (
        <article className="element">
            <img className="element__photo" src={card.link} alt={card.name} onClick={handleClick}/>
            <div className="element__info">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__like-container">
                    <button className={`element__like ${isLiked ? 'element__like_active' : ''}`} type="button" onClick={handleLikeClick}></button>
                    <p className="element__like-numbers">{card.likes.length}</p>
                </div>
            </div>
            {isOwn && <button className="element__trash" type="button" onClick={handleDeleteClick} />} 
        </article>
    )
}

export default Card;
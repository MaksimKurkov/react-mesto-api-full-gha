import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const {isOpen, onClose, onAddPlaceSubmit, isLoading} = props;

    const [place, setPlace] = useState("");
    const [placeLink, setPlaceLink] = useState("");
    const loadingText = "Добавление...";
    const handleChangePlace = (evt) => {
        setPlace(evt.target.value);
    };
    
    const handleChangeLink = (evt) => {
        setPlaceLink(evt.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
      
        onAddPlaceSubmit({name: place, link: placeLink});
    } 

    React.useEffect(() => {
        setPlace('');
        setPlaceLink('');
    }, [isOpen]);

   return (
        <PopupWithForm name = {'place'} title = {'Новое место'} buttonText = {'Создать'} {...props} onSubmit={handleSubmit} loadingText={loadingText}>
            <input type="text" placeholder="Название" className="popup__input popup__input_type_place" name="placeInput" id="place-input" value={place || ''} onChange={handleChangePlace}/>
            <span className="popup__error" id="placeInput-error"></span>
            <input type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" name="linkInput" id="url-input" value={placeLink || ''} onChange={handleChangeLink}/>
            <span className="popup__error" id="linkInput-error"></span>
        </PopupWithForm>
   );
 }
 
 export default AddPlacePopup;
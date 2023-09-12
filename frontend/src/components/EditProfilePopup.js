import React, { useState, useEffect, useContext} from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const {isOpen, onUpdateUser} = props;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const currentUser = useContext(CurrentUserContext);
    const loadingText = "Сохранение...";
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        }, [currentUser, isOpen]); 
 

    const handleChangeName = (evt) => {
        setName(evt.target.value);
    };
    
    const handleChangeDescription = (evt) => {
        setDescription(evt.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateUser({name: name, about: description});
    } 

   return (
    <PopupWithForm name = {'profile'} title = {'Редактировать профиль'} buttonText = {'Сохранить'}  {...props} onSubmit={handleSubmit} loadingText={loadingText}>
        <input type="text" placeholder="Имя" className="popup__input popup__input_type_name" name="nameInput" id="name-input" value={name || ''} onChange={handleChangeName}/>
        <span className="popup__error" id="nameInput-error"></span>
        <input type="text" placeholder="О себе" className="popup__input popup__input_type_status" name="statusInput"  id="status-input" value={description || ''} onChange={handleChangeDescription}/>
        <span className="popup__error" id="statusInput-error"></span>
    </PopupWithForm>
   );
 }
 
 export default EditProfilePopup;


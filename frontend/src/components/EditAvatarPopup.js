import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup(props) {
    const {onUpdateAvatar} = props;
    const avatarLink = useRef(null);
    const loadingText = "Сохранение...";

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
            avatar: avatarLink.current.value,
        });
    } 

   return (
        <PopupWithForm name = {'avatar'} title = {'Обновить аватар'} buttonText = {'Сохранить'} {...props} onSubmit={handleSubmit} loadingText={loadingText}>
            <input type="url" placeholder="Ссылка на аватар" className="popup__input popup__input_type_avatar" name="avatarInput" id="avatar-input" ref={avatarLink}/>
            <span className="popup__error" id="avatarInput-error"></span>
        </PopupWithForm>
   );
 }
 
 export default EditAvatarPopup;
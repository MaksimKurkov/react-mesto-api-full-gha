import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup(props) {
    const {onConfirmDeleteCard} = props;
    const loadingText = "Удаление...";

    function handleSubmit(e) {
        e.preventDefault();
      
        onConfirmDeleteCard();
    } 

   return (
    <PopupWithForm name = {'delete'} title = {'Вы уверены?'} buttonText = {'Да'} {...props} onSubmit={handleSubmit} loadingText={loadingText}/>
   );
 }
 
 export default ConfirmDeletePopup;
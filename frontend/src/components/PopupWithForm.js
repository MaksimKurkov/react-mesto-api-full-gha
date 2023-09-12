import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';


function PopupWithForm({name, title, buttonText, isOpen, onClose, isLoading, loadingText, children, onSubmit}){
    const _className = `popup popup-${name} ${isOpen ? 'popup_opened' : ''}`
    usePopupClose(isOpen, onClose);


    return(
        <div className={_className}>
        <div className="popup__container">
            <h2 className="popup__titul">{title}</h2>
            <form className={`popup__form popup__form_${name}`} name={name} onSubmit={onSubmit}>
                {children}
                <button className="popup__save" type="submit">{isLoading ? loadingText : buttonText}</button>
            </form> 
            <button className="popup__exit" type="button" onClick={onClose}/>
        </div>
    </div>
    )
}

export default PopupWithForm;
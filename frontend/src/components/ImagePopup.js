import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';

function ImagePopup({card, onClose, isOpen}) {

    const _className = `popup popup-image ${card.link ? 'popup_opened' : ''}`
    usePopupClose(isOpen, onClose);

    return (
        <div className={_className}>
            <div className="popup__container popup__container_image">
                <button className="popup__exit popup__exit_image" type="button" onClick={onClose}></button>
                <img className="popup__photo" src={card.link} alt={card.name} />
                <h2 className="popup__place">{card.name}</h2>
            </div>
        </div>
    );
}

export default ImagePopup;
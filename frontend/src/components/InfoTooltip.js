import successImg from '../images/success.svg';
import failImg from '../images/fail.svg';

function InfoTooltip({ isResponseFail, isOpen, onClose }) {
    const _className = `popup ${isOpen ? 'popup_opened' : ''}`
    const _srcImg = isResponseFail ? failImg : successImg;
    const _title = isResponseFail
        ? 'Что-то пошло не так! Попробуйте ещё раз.'
        : 'Вы успешно зарегистрировались!';
    return (
        <div className={_className}>
            <div className="popup__container">
                <button className="popup__exit" type="button" onClick={onClose}/>
                <img className="popup__result-img" src={_srcImg} alt="Результат запроса"/>
                <p className="popup__titul popup__titul_registered">{_title}</p>
            </div>
        </div>
    );
}

export default InfoTooltip;
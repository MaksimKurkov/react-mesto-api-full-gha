import React from 'react';
import logoPath from '../images/logo.svg';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function Header({ userEmail, loggedIn, onSignOut }) {
    let { pathname } = useLocation();
    const _path = (pathname === '/sign-up' ? '/sign-in' : pathname === '/sign-in' ? '/sign-up' : '');    
    const _text = (pathname === '/sign-up' ? 'Войти' : pathname === '/sign-in' ? 'Регистрация' : '');

    return (
        <header className="header">
            <img className="header__logo" src={logoPath} alt="Логотип Место" />
            <div className="header__user-status">
                <p className="header__email">{userEmail}</p>
                {loggedIn ? (
                <Link to="/" className={`header__link ${loggedIn ? 'header__link_active' : ''}`} onClick={onSignOut}>
                    Выйти
                </Link>
                ) : (
                <Link to={_path} className="header__link">
                    {_text}
                </Link>
                )}
            </div>
        </header>
  );
}

export default Header;
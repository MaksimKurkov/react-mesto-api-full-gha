import { useState } from 'react';

function LoginForm({ title, submitBtnText, onSubmit, children}) {
  const [inputValues, setInputValues] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(inputValues);
    };

    return (
        <form className="login-form" name="loginForm" onSubmit={handleSubmit}>
            <h2 className="login-form__title">{title}</h2>
            <input type="email" placeholder="Email" className="login-form__input" name="email" value={inputValues.email || ''} onChange={handleInputChange}/>
            <input type="password" placeholder="Пароль" className="login-form__input" name="password" value={inputValues.password || ''} onChange={handleInputChange} />
            <button type="submit" className="login-form__submit">{submitBtnText}</button>

            <p className="login-form__wrap-link">{children}</p>
        </form>
    );
}

export default LoginForm;
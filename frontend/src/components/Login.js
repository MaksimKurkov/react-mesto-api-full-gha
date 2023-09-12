import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';

function Login({ onLogin }) {
    return (
        <LoginForm title="Вход" submitBtnText="Войти" onSubmit={onLogin}> 
            <Link to="/sign-up" className="login-form__link">
                Нет аккаунта? Зарегистрироваться
            </Link>
        </LoginForm>
    ); 
}

export default Login;
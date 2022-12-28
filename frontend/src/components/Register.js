import AuthorizationUserForm from "./AuthorizationUserForm";
import Header from "./Header";
import {useHistory} from "react-router-dom";

function Register({onRegister, isLoggedIn}) {
    let history = useHistory();

    return (
        <>
            <Header buttonPath={() => history.push('/sign-in')} loginText='' buttonText='Войти' additionalClassName='' loggedIn={isLoggedIn}/>
            <AuthorizationUserForm onSubmit={onRegister} name='register' title='Регистрация' buttonText='Зарегистрироваться' />
        </>
    )

}

export default Register
import {useHistory} from 'react-router-dom';
import AuthorizationUserForm from './AuthorizationUserForm';
import Header from './Header';

function Register({onRegister, isLoggedIn}) {
   const history = useHistory();

   return (
      <>
         <Header buttonPath={() => history.push('/signin')} loginText='' buttonText='Войти' additionalClassName=''
                 loggedIn={isLoggedIn}/>
         <AuthorizationUserForm onSubmit={onRegister} name='register' title='Регистрация'
                                buttonText='Зарегистрироваться'/>
      </>
   );
}

export default Register;

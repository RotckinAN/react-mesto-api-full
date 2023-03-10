import {useHistory} from 'react-router-dom';
import AuthorizationUserForm from './AuthorizationUserForm';
import Header from './Header';

function Login({onLogin, isLoggedIn}) {
   const history = useHistory();

   return (
      <>
         <Header buttonPath={() => history.push('/signup')} loginText='' buttonText='Регистрация' additionalClassName=''
                 loggedIn={isLoggedIn}/>
         <AuthorizationUserForm onSubmit={onLogin} isLoggedIn={isLoggedIn} name='login' title='Вход' buttonText='Войти'
                                additionalClassName='popup__additionalInfo_type_hidden'/>
      </>
   );
}

export default Login;

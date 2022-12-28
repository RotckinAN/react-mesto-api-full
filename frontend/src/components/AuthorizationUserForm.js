import React from "react";
import useInput from "../hooks/useInput";
import {Link, Redirect} from "react-router-dom";

function AuthorizationUserForm({onSubmit, isLoggedIn, name, title, buttonText, additionalClassName}) {
    const email = useInput();
    const password = useInput();
    const [isFormValid, setIsFormValid] = React.useState(false);
    const inputEmailClassName = (`popup__item popup__item_input_email ${email.isDirty ? 'popup__item_type_error' : ''}`);
    const inputPasswordClassName = (`popup__item popup__item_input_password ${password.isDirty ? 'popup__item_type_error' : ''}`);
    const inputEmailMessageErrorClassName = (`popup__input-error inputEmail-error ${email.isDirty ? 'popup__input-error_active' : ''}`);
    const inputPasswordMessageErrorClassName = (`popup__input-error inputPassword-error ${password.isDirty ? 'popup__input-error_active' : ''}`);
    const buttonClassName = (`popup__save-button popup__save-button_type_userForm ${!isFormValid ? 'popup__save-button_type_invalidUserForm' : ''}`)

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit({
            email: email.value,
            password: password.value
        })
    }

    React.useEffect(() => {
        if (email.inputValid && password.inputValid) {
            setIsFormValid(true)
        } else {
            setIsFormValid(false)
        }
    }, [email.inputValid, password.inputValid])

    if (isLoggedIn) {
        return <Redirect to='/' />;
    }

    return (
        <div className="popup popup__container popup__container_type_userForm">
            <form onSubmit={handleSubmit} name={`${name}Form`} className="popup__content" noValidate>
                <h2 className="popup__content-title popup__content-title_type_userForm">{title}</h2>
                <label htmlFor={`${name}InputEmail`}>
                    <input onChange={email.handleChange} type="email" name="email" className={inputEmailClassName} autoComplete="off"
                           id={`${name}InputEmail`} value={email.value} placeholder='Email' minLength="2" maxLength="30" required/>
                    <span className={inputEmailMessageErrorClassName}>{email.inputError}</span>
                </label>
                <label htmlFor={`${name}InputPassword`}>
                    <input onChange={password.handleChange} type="password" name="password" className={inputPasswordClassName} autoComplete="off"
                           id={`${name}InputPassword`} value={password.value} placeholder='Пароль' required/>
                    <span className={inputPasswordMessageErrorClassName}>{password.inputError}</span>
                </label>
                <button type="submit" value={buttonText} className={buttonClassName} id={`${name}-saveButton`} disabled={!isFormValid}>{buttonText}</button>
                <Link to='/sign-in' className={`popup__additionalInfo ${additionalClassName}`}>Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    )
}

export default AuthorizationUserForm
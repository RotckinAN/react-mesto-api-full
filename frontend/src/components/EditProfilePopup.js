import PopupWithForm from "./PopupWithForm";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import useInput from "../hooks/useInput";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
    const name = useInput()
    const description = useInput();
    const [formValid, setFormValid] = useState(false);
    const currentUser = useContext(CurrentUserContext);
    const inputNameClassName = (`popup__item popup__item_input_name ${name.isDirty ? 'popup__item_type_error' : ''}`);
    const inputDescriptionClassName = (`popup__item popup__item_input_job ${description.isDirty ? 'popup__item_type_error' : ''}`);
    const inputNameMessageErrorClassName = (`popup__input-error inputName-error ${name.isDirty ? 'popup__input-error_active' : ''}`);
    const inputDescriptionMessageErrorClassName = (`popup__input-error inputJob-error ${description.isDirty ? 'popup__input-error_active' : ''}`);
    const buttonText = isLoading ? 'Сохранение...' : 'Сохранить';

    useEffect(() => {
        name.setValue(currentUser.name);
        description.setValue(currentUser.about);
        name.setIsDirty(false);
        description.setIsDirty(false);
        name.setInputError('');
        description.setInputError('');
        name.setInputValid(true);
        description.setInputValid(true);
        setFormValid(true)
    }, [currentUser, isOpen]);

    useEffect(() => {
        if (name.inputValid && description.inputValid) {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [name.inputValid, description.inputValid])

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name: name.value,
            about: description.value})
    }

    return (
        <PopupWithForm name='editProfile' title='Редактировать профиль' buttonText={buttonText} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isFormValid={formValid}> {/* попап редактирования профиля */}
            <label htmlFor="inputName">
                <input onChange={name.handleChange} value={name.value || ''} type="text" name="name" className={inputNameClassName} autoComplete="off"
                       id="inputName" placeholder="Имя" minLength="2" maxLength="40" required/>
                <span className={inputNameMessageErrorClassName}>{name.inputError}</span>
            </label>
            <label htmlFor="inputJob">
                <input onChange={description.handleChange} value={description.value || ''} type="text" name="about" className={inputDescriptionClassName} autoComplete="off"
                       id="inputJob" placeholder="О себе" minLength="2" maxLength="200" required/>
                <span className={inputDescriptionMessageErrorClassName}>{description.inputError}</span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup
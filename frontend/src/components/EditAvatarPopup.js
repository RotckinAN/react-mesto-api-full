import PopupWithForm from "./PopupWithForm";
import {useEffect, useRef, useState} from "react";
import useInput from "../hooks/useInput";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
    const inputRef = useRef();
    const avatar = useInput();
    const [formValid, setFormValid] = useState(false);
    const avatarInputClassName = (`popup__item popup__item_input_avatarPicture ${avatar.isDirty ? 'popup__item_type_error' : ''}`)
    const avatarMessageErrorClassName = (`popup__input-error inputPictureAvatar-error ${avatar.isDirty ? 'popup__input-error_active' : ''}`);
    const buttonText = isLoading ? 'Сохранение...' : 'Сохранить';

    useEffect(() => {
        inputRef.current.value = "";
        avatar.setIsDirty(false);
        avatar.setInputError('');
        avatar.setInputValid(false)
        setFormValid(false);
    }, [isOpen]);

    useEffect(() => {
        if (avatar.inputValid) {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [avatar.inputValid])

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value // ref применяется по заданию
        });
    }

    return (
        <PopupWithForm name='avatarUpdate' title='Обновить аватар' additionalClassName='popup__content-title_type_avatarCreate' buttonText={buttonText} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isFormValid={formValid}> {/* попап обновления аватара */}
            <label htmlFor="inputPictureAvatar">
                <input onChange={avatar.handleChange} ref={inputRef} type="url" className={avatarInputClassName} name="avatar" autoComplete="off"
                       id="inputPictureAvatar" value={avatar.value} placeholder="Ссылка на картинку" required/>
                <span className={avatarMessageErrorClassName}>{avatar.inputError}</span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup
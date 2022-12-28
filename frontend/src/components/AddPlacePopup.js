import PopupWithForm from "./PopupWithForm";
import {useEffect, useState} from "react";
import useInput from "../hooks/useInput";

function AddPlacePopup({isOpen, onClose, onAddPlaceSubmit, isLoading}) {
  const name = useInput();
  const link = useInput();
  const [formValid, setFormValid] = useState(false);
  const inputNameClassName = (`popup__item popup__item_input_pictureName ${name.isDirty ? 'popup__item_type_error' : ''}`);
  const inputLinkClassName = (`popup__item popup__item_input_picture ${link.isDirty ? 'popup__item_type_error' : ''}`);
  const inputNameMessageErrorClassName = (`popup__input-error inputPicturePopup-error ${name.isDirty ? 'popup__input-error_active' : ''}`);
  const inputLinkMessageErrorClassName = (`popup__input-error inputPictureLink-error ${link.isDirty ? 'popup__input-error_active' : ''}`);
  const buttonText = isLoading ? 'Создание...' : 'Создать';

    useEffect(() => {
        name.setValue('');
        link.setValue('');
        name.setIsDirty(false);
        link.setIsDirty(false);
        name.setInputError('');
        link.setInputError('');
        name.setInputValid(false);
        link.setInputValid(false);
        setFormValid(false)
    }, [isOpen])

    useEffect(() => {
        if (name.inputValid && link.inputValid) {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [name.inputValid, link.inputValid])

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlaceSubmit({
            name: name.value,
            link: link.value
        });
    }

    return(
        <PopupWithForm name='addPicture' title='Новое место' buttonText={buttonText} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isFormValid={formValid}> {/* попап добавления новых фото */}
            <label htmlFor="inputPicturePopup">
                <input onChange={name.handleChange} type="text" name="name" className={inputNameClassName} autoComplete="off" id="inputPicturePopup" value={name.value} placeholder='Название' minLength="2" maxLength="30" required/>
                <span className={inputNameMessageErrorClassName}>{name.inputError}</span>
            </label>
            <label htmlFor="inputPictureLink">
                <input onChange={link.handleChange} type="url" name="link" className={inputLinkClassName} autoComplete="off" id="inputPictureLink" value={link.value} placeholder='Ссылка на картинку' required/>
                <span className={inputLinkMessageErrorClassName}>{link.inputError}</span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup
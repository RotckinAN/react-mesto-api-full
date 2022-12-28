import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({isLoading, onClose, actualCard, onCardDelete, isOpen}) {
    const buttonText = isLoading ? 'Удаление...' : 'Да';

    function handleSubmit(evt) {
        evt.preventDefault();
        onCardDelete(actualCard)
    }

    return (
        <PopupWithForm name='confirmDelete' title='Вы уверены?' additionalClassName='popup__content-title_type_confirmDelete' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText={buttonText} isFormValid={true}/>
    )
}

export default ConfirmationPopup
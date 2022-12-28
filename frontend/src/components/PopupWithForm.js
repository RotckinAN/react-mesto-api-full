function PopupWithForm({name, isOpen, onClose, onSubmit, additionalClassName, title, buttonText, children, isFormValid}) {
    const buttonClassName = (`popup__save-button ${isFormValid ? '' : 'popup__save-button_invalid'}`)

    function overlayClose(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            onClose();
        }
    }

    return (
        <div>
            {/* попап редактирования профиля */}
            <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={overlayClose}>
                <div className="popup__container">
                    <button className="popup__close" type="button" onClick={onClose}></button>
                    <form onSubmit={onSubmit} name={`${name}Form`} className={`popup__content popup__content_type_${name}`} noValidate={true}>
                        <h2 className={`popup__content-title ${additionalClassName}`}>{title}</h2>
                        {children}
                        <button type="submit" value={buttonText} className={buttonClassName} id={`${name}-saveButton`} disabled={!isFormValid}>{buttonText}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PopupWithForm
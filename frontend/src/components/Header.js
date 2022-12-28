import {useState} from 'react';

function Header({loginText, buttonText, additionalClassName, buttonPath, loggedIn}) {
    const [isHiddenContainerOpen, setIsHiddenContainerOpen] = useState(false);
        const hiddenContainerClassName = (`header__hiddenContainer ${isHiddenContainerOpen ? 'header__hiddenContainer_active' : ''}`);
        const mobileVersionButtonClassName = (`header__mobileVersionButton ${isHiddenContainerOpen ? 'header__mobileVersionButton_active' : ''} ${!loggedIn ? 'header__mobileVersionButton_inactive' : ''}`);
        const loginButtonClassName = (`header__loginButton ${additionalClassName} ${!loggedIn ? 'header__loginButton_visibly' : ''}`)

    function handleHiddenContainerClick(evt) {
        if (evt.target.classList.contains('header__mobileVersionButton_active')) {
            setIsHiddenContainerOpen(false)
        } else {
            setIsHiddenContainerOpen(true)
        }
    }

    return (
        <header className="header page__header">
            <div className={hiddenContainerClassName}>
                <p className='header__userLogin header__userLogin_active'>{loginText}</p>
                <button onClick={buttonPath} className='header__loginButton header__loginButton_active'>{buttonText}</button>
            </div>
            <div className='header__container'>
                <div className="header__logo"></div>
                <div className='header__loginContainer'>
                    <p className='header__userLogin'>{loginText}</p>
                    <button onClick={buttonPath} className={loginButtonClassName}>{buttonText}</button>
                    <button onClick={handleHiddenContainerClick} className={mobileVersionButtonClassName}></button>
                </div>

            </div>
        </header>
    )
}

export default Header
import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardLike, onCardClick, onDeleteButtonClick}) {
    const userContext = useContext(CurrentUserContext);
    const isOwn = userContext._id === card.owner._id;
    const isLiked = card.likes.some(i => i._id === userContext._id);
    const cardDeleteButtonClassName = (`element__trash ${isOwn ? '' : 'element__trash_type_hidden'}`);
    const cardLikeButtonClassName = (`element__like ${isLiked ? 'element__like_active' : ''}`)

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onDeleteButtonClick(card)
    }

    return (
        <li className="elements__item element">
            <img className="element__photo" src={card.link} alt={card.name} onClick={handleClick}/>
                <button className={cardDeleteButtonClassName} type="button" aria-label="trash" onClick={handleDeleteClick}></button>
                <div className="element__container">
                    <h2 className="element__title">{card.name}</h2>
                    <div className="element__likeContainer">
                        <button className={cardLikeButtonClassName} type="button" aria-label="like" onClick={handleLikeClick}></button>
                        <p className="element__likeNumbers">{card.likes.length}</p>
                    </div>
                </div>
        </li>
    )
}

export default Card
import {useCallback, useEffect, useState} from 'react';
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/mestoAuth";

function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [isLoggedInImage, setIsLoggedInImage] = useState(false);
   const [isLoadingPage, setIsLoadingPage] = useState(true);
   const [userData, setUserData] = useState({});
   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
   const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
   const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
   const [infoTooltipText, setInfoTooltipText] = useState('');
   const [selectedCard, setIsSelectedCard] = useState({src: '#', alt: '#', state: false});
   const [currentUser, setCurrentUser] = useState({});
   const [cards, setCards] = useState([]);
   const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isConfirmationPopupOpen || selectedCard.state;
   const [isLoading, setIsLoading] = useState(false);
   const [actualCard, setActualCard] = useState({});
   let history = useHistory();

   const userRegister = useCallback(async (registrationData) => {
      try {
         const res = await auth.register(registrationData);
         if (!res) {
            throw new Error('Invalid credentials');
         }
         if (res) {
            setUserData(res);
            setIsLoggedInImage(true);
            setInfoTooltipText('???? ?????????????? ????????????????????????????????????!');
            handleRegisterInfoTooltipOpen(true);
            history.push('/signin');
         }
      } catch {
         setInfoTooltipText('??????-???? ?????????? ???? ??????!\n' + '???????????????????? ?????? ??????.')
         handleRegisterInfoTooltipOpen(true);
         throw new Error('Invalid credentials');
      }
   }, [])

   const userLogin = useCallback(async (registrationData) => {
      try {
         const data = await auth.authorize(registrationData);
         if (!data) {
            throw new Error('Invalid credentials');
         }
         if (data) {
            setIsLoggedIn(true);
            setIsLoggedInImage(true);
            setUserData(registrationData);
            setInfoTooltipText('?????????? ????????????????????!');
            handleLoginInfoTooltipOpen(true);
         }
      } catch {
         setInfoTooltipText('??????-???? ?????????? ???? ??????!\n' + '???????????????????? ?????? ??????.')
         handleLoginInfoTooltipOpen(true);
         throw new Error('Invalid credentials');
      } finally {
         setIsLoadingPage(false)
      }
   }, []);

   const userLogout = useCallback(async () => {
      try {
         const logOut = await auth.logOut();
         console.log(logOut)
         setIsLoggedIn(false);

      } catch {
         throw new Error('Invalid credentials');
      }
   }, [])

   const handleTokenCheck = useCallback(async () => {
      try {
         const resUser = await auth.checkToken();
         if (!resUser) {
            throw new Error('Invalid user')
         }
         if (resUser) {
            setUserData(resUser);
            setIsLoggedIn(true);
         }
      } catch (err) {
         throw new Error('Invalid user')
      } finally {
         setIsLoadingPage(false);
      }
   }, []);

   useEffect(() => {
      handleTokenCheck()
         .catch((err) => {
            console.error(err)
         })
   }, [handleTokenCheck])

   useEffect(() => {
      if (isLoggedIn) {
         api.getUserInfoByRequest()
            .then((res) => {
               setCurrentUser(res);
            })
            .catch((err) => {
               console.error(err)
            });
      }
   }, [isLoggedIn]);

   useEffect(() => {
      if (isLoggedIn) {
         api.getInitialCards()
            .then((cards) => {
               setCards(cards.reverse())
            })
            .catch((err) => {
               console.error(err)
            });
      }
   }, [isLoggedIn]);

   function handleEditProfileClick() {
      setIsEditProfilePopupOpen(true)
   }

   function handleAddPlaceClick() {
      setIsAddPlacePopupOpen(true)
   }

   function handleEditAvatarClick() {
      setIsEditAvatarPopupOpen(true)
   }

   function handleConfirmationPopupOpen(card) {
      setIsConfirmationPopupOpen(true);
      setActualCard(card);
   }

   function handleLoginInfoTooltipOpen() {
      setIsInfoTooltipOpen(true);
   }

   function handleRegisterInfoTooltipOpen() {
      setIsInfoTooltipOpen(true);
   }

   function handleCardLike(card) {
      const isLiked = card.likes.some(i => i === currentUser._id);
      api.changeLikeCardStatus(card._id, !isLiked)
         .then((newCard) => {
            setCards((state) =>
               state.map((c) => (c._id === card._id ? newCard : c))
            );
         })
         .catch((err) => {
            console.error(err)
         });
   }

   function handleCardDelete(card) {
      setIsLoading(true);
      api.deleteCard(card._id)
         .then(() => {
            setCards((state) =>
               state.filter((item) =>
                  item._id !== card._id));
            closeAllPopups()
         })
         .catch((err) => {
            console.error(err)
         })
         .finally(() => {
            setIsLoading(false)
         })
   }

   function closeAllPopups() {
      setIsEditProfilePopupOpen(false);
      setIsAddPlacePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setIsConfirmationPopupOpen(false);
      setIsSelectedCard({src: '#', alt: '#', state: false});
      setIsInfoTooltipOpen(false);
   }

   useEffect(() => {
      function closeByEsc(evt) {
         if (evt.key === 'Escape') {
            closeAllPopups()
         }
      }

      if (isOpen) {
         document.addEventListener('keydown', closeByEsc);
         return () => {
            document.removeEventListener('keydown', closeByEsc)
         }
      }
   }, [isOpen])

   function handleCardClick(props) {
      setIsSelectedCard({
         alt: props.name,
         src: props.link,
         state: true
      })
   }

   function handleUpdateUser(userInfo) {
      setIsLoading(true);

      api.patchProfileInfo(userInfo)
         .then((res) => {
            setCurrentUser((prevState) => ({...prevState, name: res.name, about: res.about}));
            closeAllPopups()
         })
         .catch((err) => {
            console.error(err)
         })
         .finally(() => {
            setIsLoading(false)
         })
   }

   function handleAddPlaceSubmit(newPhoto) {
      setIsLoading(true);

      api.postNewPhoto(newPhoto)
         .then((res) => {
            setCards([res, ...cards]);
            closeAllPopups()
         })
         .catch((err) => {
            console.error(err)
         })
         .finally(() => {
            setIsLoading(false)
         })
   }

   function handleUpdateAvatar(newAvatar) {
      setIsLoading(true);
      api.patchProfileAvatar(newAvatar)
         .then((res) => {
            setCurrentUser((prevState) => ({...prevState, avatar: res.avatar}));
            closeAllPopups()
         })
         .catch((err) => {
            console.error(err)
         })
         .finally(() => {
            setIsLoading(false)
         })
   }

   if (isLoadingPage) {
      return (
         <div className='page__loadingContainer'>
            <span className='page__loading'>Page is loading...</span>
         </div>
      )
   }

   return (
      <div className="page">
         <CurrentUserContext.Provider value={currentUser}>
            <Switch>
               <ProtectedRoute exact path='/' loggedIn={isLoggedIn} component={Main}
                               onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}
                               onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}
                               onCardLike={handleCardLike} cards={cards}
                               onDeleteButtonClick={handleConfirmationPopupOpen} userData={userData}
                               logout={userLogout}>
               </ProtectedRoute>
               <Route path='/signup'>
                  <Register isLoggedIn={isLoggedIn} onRegister={userRegister}/>
               </Route>
               <Route path='/signin'>
                  <Login isLoggedIn={isLoggedIn} onLogin={userLogin}/>
               </Route>
               <Route>
                  {isLoggedIn ? <Redirect exact to='/'/> : <Redirect to='/signin'/>}
               </Route>
            </Switch>
            <Footer/>

            <InfoTooltip loggedIn={isLoggedInImage} name='infoTooltip' isOpen={isInfoTooltipOpen}
                         infoText={infoTooltipText} onClose={closeAllPopups}/>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}
                              isLoading={isLoading}/>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit}
                           isLoading={isLoading}/>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}
                             isLoading={isLoading}/>
            <ConfirmationPopup isOpen={isConfirmationPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete}
                               actualCard={actualCard} isLoading={isLoading}/>
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
         </CurrentUserContext.Provider>
      </div>
   );
}

export default App;
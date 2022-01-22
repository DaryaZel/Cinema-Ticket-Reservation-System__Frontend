import { UserContext } from '../../../App.js';
import { useContext, useState } from 'react';
import film from './images/film.png';
import './Header.css';
import { SearchForm } from './SearchForm/SearchForm';
import { SignUp } from '../SignUp/SignUp';
import { Avatar } from '../Avatar/Avatar';
import { SignUpModalWindow } from '../ModalWindow/SignUpModalWindow';
import { LogInModalWindow } from '../ModalWindow/LogInModalWindow';

export function Header() {
    const [signUpActiveModal, setSignUpActiveModal] = useState(false);
    const [logInActiveModal, setLogInActiveModal] = useState(false);
    const { user, setUserState } = useContext(UserContext);
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo logo">
                    <div className="logo__text">
                        <h2>Spool</h2>
                    </div>
                    <div className="logo__icon">
                        <img src={film} alt="film_logo" />
                    </div>
                </div>
                <SearchForm />
                {
                    user ? (<Avatar username={user.username} setUserState={setUserState} />) :
                        (<SignUp
                            setSignUpActiveModal={setSignUpActiveModal}
                            setLogInActiveModal={setLogInActiveModal}
                        />)
                }
                {
                    signUpActiveModal ? (
                        <SignUpModalWindow setSignUpActiveModal={setSignUpActiveModal} />
                    ) :
                        null
                }
                {
                    logInActiveModal ? (<LogInModalWindow setLogInActiveModal={setLogInActiveModal} setUserState={setUserState} />)
                        : null
                }
            </div>
        </header>
    );
}

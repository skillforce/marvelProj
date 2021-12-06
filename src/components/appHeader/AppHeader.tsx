import './appHeader.scss';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../Routes/Routes';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink to={PATH.CHARPAGE} className={({isActive}) =>
                            isActive ? 'app__activeLink' : 'app__link'}>Characters</NavLink>
                    </li>
                    /
                    <li>
                        <NavLink to={PATH.COMICS} className={({isActive}) =>
                            isActive ? 'app__activeLink' : 'app__link'}>Comics</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;
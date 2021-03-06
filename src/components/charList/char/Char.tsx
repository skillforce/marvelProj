import './char.scss';
import abyss from '../../../resources/img/abyss.jpg';
import React from 'react';
import {CSSTransition} from 'react-transition-group'


type CharPropsType = {
    name: string | null
    img: string | null
    setSelectedChar: (id: number | null) => void
    id: number | null
    charId: number | null
}


export const Char = (props: CharPropsType) => {
    const {name, img, setSelectedChar, id, charId} = props;
    const notAvailableImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    const correctImgClass = img === notAvailableImg ? 'char__badItem' : 'char__item'
    const activeItem = charId === id ? img === notAvailableImg ? 'char__badItem char_selected' : 'char__item char_selected' : correctImgClass
    return (
        <CSSTransition key={id}
                       timeout={500}
                       classNames={activeItem}>
        <li onClick={() => {
            setSelectedChar(id)
        }} className={activeItem}>
            <img src={img ? img : abyss} alt="abyss"/>
            <div className="char__name">{name ? name : 'not found'}</div>
        </li>
        </CSSTransition>
    )
}

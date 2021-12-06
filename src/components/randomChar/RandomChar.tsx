import './randomChar.scss';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import React, {useEffect, useState} from 'react';
import {useMarvelService} from '../../services/MarvelService';
import Spinner from '../preloader/preloader';
import {ErrorMsg} from '../ErrorMsg/ErrorMsg';


export type CharType = {
    name: null | string
    description: null | string
    thumbnail: string | null
    homePage: string | null
    wikiUrl: string | null
    id: number | null
}


export const RandomChar = () => {

    const {loading, error, getCharacter,clearError} = useMarvelService()

    const [char, setChar] = useState<CharType>({
        name: null,
        description: null,
        thumbnail: null,
        homePage: null,
        wikiUrl: null,
        id: null
    })


    useEffect(() => {
        updateChar()
    }, [])


    const onCharLoaded = (char: CharType) => {
        setChar(char);
    }

    const updateChar = (id: number = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)) => {
        clearError()
        getCharacter(id).then(onCharLoaded)
    }


    const isLoading = loading ? <Spinner/> : <View char={char}/>
    const errorMsg = error ? <ErrorMsg/> : isLoading

    return (
        <div className="randomchar">
            {errorMsg}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={() => updateChar()} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

type ViewPropsType = {
    char: CharType
}


const View = (char: ViewPropsType) => {

    const {name, description, thumbnail, homePage, wikiUrl} = char.char;
    const notAvailableImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    const real = thumbnail === notAvailableImg
    const newImgStyle = real ? 'randomchar__badImg' : 'randomchar__img'


    return (<div className="randomchar__block">
        <img src={thumbnail ? thumbnail : thor} alt="Random character" className={newImgStyle}/>

        <div className="randomchar__info">
            <p className="randomchar__name">{name ? name : 'Thor'}</p>
            <p className="randomchar__descr">
                {description}
            </p>
            <div className="randomchar__btns">
                <a target={'_blank'} href={homePage ? homePage : '#'} className="button button__main" rel="noreferrer">
                    <div className="inner">homepage</div>
                </a>
                <a target={'_blank'} href={wikiUrl ? wikiUrl : '#'} className="button button__secondary" rel="noreferrer">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>)
}


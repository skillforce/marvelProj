import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import {Component, useEffect, useState} from 'react';
import {MarvelService} from '../../services/MarvelService';
import React from 'react';
import {CharComicsItem} from './CharComicsItem/CharComicsItem';
import Spinner from '../preloader/preloader';
import {ErrorMsg} from '../ErrorMsg/ErrorMsg';


type CharInfoPropsType = {
    charId: number | null
}
export type ComicsItemsType = {
    resourceURI: string
    name: string
}


type CharInfoCharType = {
    name: null | string
    description: null | string
    thumbnail: string | null
    homePage: string | null
    wikiUrl: string | null
    id: number | null
    comics: null | ComicsItemsType[] | []
}


type ViewCharInfoPropsType = {
    char: CharInfoCharType
}


export const CharInfo = (props: CharInfoPropsType) => {
    const {charId} = props
    const marvelService = new MarvelService()
    const [char, setChar] = useState<CharInfoCharType>({
        name: null,
        description: null,
        thumbnail: null,
        homePage: null,
        wikiUrl: null,
        id: null,
        comics: null
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)


    const onCharLoaded = (char: CharInfoCharType) => {
        setChar(char)
        setLoading(false)
    }

    useEffect(() => {
        updateChar()
    }, [charId])


    const updateChar = () => {
        setLoading(true)
        if (!charId) {
            setLoading(false)
        }
        {
            charId && marvelService.getCharacter(charId).then(onCharLoaded).catch(onError)
        }
    }


    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const isLoading = loading ? <Spinner/> : char.comics || char.name ? <ViewCharInfo char={char}/> :
        <CharComicsItem comics={null}/>


    const isErrorMsg = error ? <ErrorMsg/> : isLoading

    return (<div className="char__info">
        {isErrorMsg}
    </div>)
}


const ViewCharInfo = (props: ViewCharInfoPropsType) => {
    const {char} = props
    const {name, description, thumbnail, wikiUrl, comics, homePage} = char

    const comicsItems = comics ? comics.length === 0 ? 'Can\'t find anyone comics' : comics.map((t, i) =>
            <CharComicsItem
                key={i} comics={t}/>) :
        <CharComicsItem comics={null}/>
    const notAvailableImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    const correctImgClass = thumbnail === notAvailableImg ? 'char__badBasics' : 'char__basics'

    return (
        <>
            <div className={correctImgClass}>
                <img src={thumbnail ? thumbnail : thor} alt="abyss"/>
                <div>
                    <div className="char__info-name">{name ? name : 'No name'}</div>
                    <div className="char__btns">
                        <a target={'_blank'} href={homePage ? homePage : '#'} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a target={'_blank'} href={wikiUrl ? wikiUrl : '#'} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description ? description : 'no description'}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsItems}
            </ul>
        </>
    )

}

export default CharInfo;
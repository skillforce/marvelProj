import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import React, {useEffect, useState} from 'react';
import {useMarvelService} from '../../services/MarvelService';
import {CharComicsItem} from './CharComicsItem/CharComicsItem';
import {setUpContent} from '../../utils/setContent';


type CharInfoPropsType = {
    charId: number | null
}
export type ComicsItemsType = {
    resourceURI: string
    name: string
}


export type CharInfoCharType = {
    name: null | string
    description: null | string
    thumbnail: string | null
    homePage: string | null
    wikiUrl: string | null
    id: number | null
    comics: null | ComicsItemsType[] | []
}


type ViewCharInfoPropsType = {
    data: CharInfoCharType
}


export const CharInfo = (props: CharInfoPropsType) => {
    const {charId} = props
    const {setProcess, getCharacter, clearError, process} = useMarvelService()
    const [char, setChar] = useState<CharInfoCharType>({
        name: null,
        description: null,
        thumbnail: null,
        homePage: null,
        wikiUrl: null,
        id: null,
        comics: null
    })


    const onCharLoaded = (char: CharInfoCharType) => {
        setChar(char)
    }

    useEffect(() => {
        updateChar()
    }, [charId])


    const updateChar = () => {
        if (charId) {
            clearError()
            getCharacter(charId)
                .then(onCharLoaded)
                .then(() => (setProcess('confirmed')))
        }
    }





    return (<div className="char__info">
        {setUpContent(process, char ,ViewCharInfo)}
    </div>)
}


 export const ViewCharInfo = (props: ViewCharInfoPropsType) => {
    const {data} = props
    const {name, description, thumbnail, wikiUrl, comics, homePage} = data

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
                        <a target={'_blank'} href={homePage ? homePage : '#'} className="button button__main"
                           rel="noreferrer">
                            <div className="inner">homepage</div>
                        </a>
                        <a target={'_blank'} href={wikiUrl ? wikiUrl : '#'} className="button button__secondary"
                           rel="noreferrer">
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
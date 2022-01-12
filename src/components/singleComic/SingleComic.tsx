import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import {NavLink, useParams} from 'react-router-dom';
import {PATH} from '../../Routes/Routes';
import React, {useEffect, useState} from 'react';
import {OneComicsType} from '../ComicsList/ComicsList';
import {useMarvelService} from '../../services/MarvelService';
import {ErrorMsg} from '../ErrorMsg/ErrorMsg';
import Spinner from '../preloader/preloader';
import {debug} from 'util';
import {Helmet} from 'react-helmet';


type SingleComicPropsType = {
    type: 'comic' | 'character'
}


const SingleComic = ({type}: SingleComicPropsType) => {

    const[character,setCharacter] = useState(null)
    const [comic, setComic] = useState<OneComicsType>({
        id: 12343,
        title: 'X-Men: Days of Future Past',
        price: '9.99$',
        thumbnail: xMen,
        language: 'en-us',
        description: 'Re-live the legendary first journey into the dystopian future of 2013\n' +
            '                    - where Sentinels stalk the Earth, and the X-Men are humanity\'s only hope...until they die! Also\n' +
            '                    featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men\n' +
            '                    from Cyclops himself...and a demon for Christmas!?',
        pageCount: 144
    });


    const [newItemLoading, setNewItemLoading] = useState<boolean>(false);


    let {id,name} = useParams();
    console.log(name)


    const {loading, error, getComics, clearError,getCharacterByName} = useMarvelService()


    useEffect(() => {
        {type==='comic' && updateComic(Number(id))}
        {type==='character' && name && updateCharacter(name)}

    }, [id])


    const updateComic = (id: number) => {
        clearError()
        setNewItemLoading(true)
        getComics(id)
            .then(onComicLoaded)
    }
    const updateCharacter = (name: string) => {
        clearError()
        setNewItemLoading(true)
        getCharacterByName(name)
            .then(onCharacterLoaded)
    }


    const onComicLoaded = (comic: OneComicsType) => {
        setComic(comic)
        setNewItemLoading(false)
    }
    const onCharacterLoaded = (character: any) => {
        setCharacter(character)
        setNewItemLoading(false)
    }


    if (error) {
        return (<ErrorMsg/>)
    }
    if (loading) {
        return (<Spinner/>)
    }
    return (
        <div>
            {type === 'comic' && <ViewComic type={'comic'} comic={comic}/>}
            {type === 'character' && <ViewComic type={'character'} character={character}/>}
        </div>
    )
}

type ViewComicPropsType = {
    comic?: OneComicsType
    type: 'comic' | 'character'
    character?: any
}


const ViewComic = ({type, comic, character}: ViewComicPropsType) => {
    if (type === 'comic' && comic) {
        const {language, pageCount, price, title, thumbnail, description} = comic

        return (
            <div className="single-comic">
                <Helmet>
                    <meta name="description" content="Comic Info."/>
                    <title>{title}</title>
                </Helmet>
                <img src={thumbnail} alt="x-men" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{`${price === 'not available' ? 'no price' : price}`}</div>
                </div>
                <NavLink to={PATH.COMICS} className="single-comic__back">Back to all</NavLink>
            </div>
        )
    } else if (type === 'character' && character) {
        const {name, thumbnail, description} = character

        return (
            <div className="single-comic">
                <Helmet>
                    <meta name="description" content="Character Info."/>
                    <title>{name}</title>
                </Helmet>
                <img src={thumbnail} alt="x-men" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                </div>
                <NavLink to={PATH.CHARPAGE} className="single-comic__back">Back to all</NavLink>
            </div>
        )
    }else return(<div>Error</div>)
}


export default SingleComic;
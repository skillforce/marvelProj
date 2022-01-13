import './singlePage.scss';
import xMen from '../../resources/img/x-men.png';
import {NavLink, useParams} from 'react-router-dom';
import {PATH} from '../../Routes/Routes';
import React, {useCallback, useEffect, useState} from 'react';
import {OneComicsType} from '../ComicsList/ComicsList';
import {useMarvelService} from '../../services/MarvelService';
import {Helmet} from 'react-helmet';
import {setUpContent} from '../../utils/setContent';


type SingleComicPropsType = {
    type: 'comic' | 'character'
}


 const SinglePage = ({type}: SingleComicPropsType) => {

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



    let {id,name} = useParams()


    const {getComics, clearError,getCharacterByName,process,setProcess} = useMarvelService()


     const updateComic = (id: number) => {
         clearError()

         getComics(id)
             .then(onComicLoaded)
             .then(()=>setProcess('confirmed'))
     }
     const updateCharacter =useCallback((name: string) => {
         clearError()

         getCharacterByName(name)
             .then(onCharacterLoaded)
             .then(()=>setProcess('confirmed'))
     },[clearError])

    useEffect(() => {
        if(type==='comic'){
            updateComic(Number(id))
        }else{
            name && updateCharacter(name)
        }
    }, [type,id,name,updateCharacter])





    const onComicLoaded = (comic: OneComicsType) => {
        setComic(comic)
    }
    const onCharacterLoaded = (character: any) => {
        setCharacter(character)
    }



    return (
        <div>
            {type === 'comic' && setUpContent(process,comic,ViewComic,'none','comic')}
            {type === 'character' && setUpContent(process,character,ViewComic,'none','character')}
        </div>
    )
}

type ViewComicPropsType = {

    type: 'comic' | 'character'
    data: any
}


const ViewComic = ({type, data}: ViewComicPropsType) => {
    if (type === 'comic' && data) {
        const {language, pageCount, price, title, thumbnail, description} = data

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
    } else if (type === 'character' && data) {
        const {name, thumbnail, description} = data

        return (
            <div className="single-comic">
                <Helmet>
                    <meta name="description" content="Character Info."/>
                    <title>{name}</title>
                </Helmet>
                <img src={thumbnail} alt="char" className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                </div>
                <NavLink to={PATH.CHARPAGE} className="single-comic__back">Back to all</NavLink>
            </div>
        )
    }else return(<div>Error</div>)
}


export default SinglePage;
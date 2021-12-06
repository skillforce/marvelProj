import {useState, useEffect} from 'react';
import {useMarvelService} from '../../services/MarvelService';
import Spinner from '../preloader/preloader';
import {ErrorMsg} from '../ErrorMsg/ErrorMsg';

import './ComicsList.scss';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../Routes/Routes';

type OneComicsType = {
    id: number,
    title: string,
    description: string,
    pageCount: number | string,
    thumbnail: string,
    language: string,
    price: string
}


const ComicsList = () => {

    const [comicsList, setComicsList] = useState<OneComicsType[]>([]);
    const [newItemLoading, setNewItemLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);
    const [comicsEnded, setComicsEnded] = useState<boolean>(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset: number, initial: boolean = false) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newComicsList: OneComicsType[]) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }

    function renderItems(arr: OneComicsType[]) {
        const items = arr.map((item: OneComicsType, i: number) => {
            return (
                <li className="comics__item" key={i}>
                    <NavLink to={PATH.SINGLECOMIC}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </NavLink>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMsg/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
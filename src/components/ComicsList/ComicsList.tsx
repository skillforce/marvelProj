import {useCallback, useEffect, useState} from 'react';
import {useMarvelService} from '../../services/MarvelService';
import './ComicsList.scss';
import {NavLink} from 'react-router-dom';
import {setUpContent} from '../../utils/setContent';


export type OneComicsType = {
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


    const onComicsListLoaded = async (newComicsList: OneComicsType[]) => {

        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList([...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }



    const {getAllComics,process,setProcess} = useMarvelService();
    const onRequest = useCallback((offset: number, initial: boolean = false) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(()=>setProcess('confirmed'))
    },[])

    useEffect(() => {
        onRequest(offset, true);
    }, [offset])




    function renderItems(data: OneComicsType[]) {
        const items = data.map(item => {
            return (
                <li className="comics__item" key={item.id}>
                    <NavLink to={`/comics/${item.id}`}>
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


    return (
        <div className="comics__list">
            {setUpContent(process,comicsList,()=>renderItems(comicsList))}
            <button
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                className={newItemLoading?"button button__secondary button__long" : "button button__main button__long"}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
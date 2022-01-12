import './charList.scss';
import {Char} from './char/Char';
import React, {useEffect, useState} from 'react';
import {useMarvelService} from '../../services/MarvelService';
import {CharType} from '../randomChar/RandomChar';
import Spinner from '../preloader/preloader';
import {ErrorMsg} from '../ErrorMsg/ErrorMsg';



type CharListPropsType = {
    setSelectedChar: (id: number | null) => void
    charId: number | null
}


export const CharList = (props: CharListPropsType) => {
    const {setSelectedChar, charId} = props
    const {getAllCharacters, loading, error, _baseOffset, clearError} = useMarvelService()
    const [charactersData, setCharactersData] = useState<CharType[]>([])
    const [pageOffset, setPageOffSet] = useState<number>(_baseOffset)
    const [charEnded, setCharEnded] = useState<boolean>(false)


    useEffect(() => {
        updateCharListItem()
    }, [pageOffset])

    const onCharLoaded = (charactersData: CharType[]) => {
        setCharactersData(charactersData)
    }


    const updateCharListItem = () => {
        clearError()
        getAllCharacters(pageOffset)
            .then(res => {
                {
                    res.length < 9 && setCharEnded(true);
                }
                {
                    res.length === 9 && setCharEnded(false);
                }

                onCharLoaded(res)
            })
    }

    const onClickLoadMoreBtnHandler = (offset: number) => {
        setPageOffSet((pageOffset) => pageOffset + offset)
    }

    const correctBtnClassName = loading ? 'button button__secondary button__long' : 'button button__main button__long'


    const isLoading = loading ? <div className={'spinerPage'}><Spinner/></div> :
        <ul className="char__grid"> {charactersData.map((t) =><Char charId={charId}
                      key={t.id}
                      name={t.name}
                      img={t.thumbnail}
                      id={t.id}
                      setSelectedChar={setSelectedChar}/>)}</ul>


    const isError = error ? <ErrorMsg/> : isLoading;

    return (
        <div className="char__list">
            {isError}
            <div className={'btn_block'}>
                {pageOffset !== 210 && <button disabled={loading} onClick={() => onClickLoadMoreBtnHandler(-9)}
                                               className={correctBtnClassName}>
                    <div className="inner">Previous Page</div>
                </button>}
                {!charEnded && <button disabled={loading} onClick={() => onClickLoadMoreBtnHandler(9)}
                                       className={correctBtnClassName}>
                    <div className="inner">Next page</div>
                </button>}
            </div>
        </div>
    )
}

import './charList.scss';
import {Char} from './char/Char';
import React, {useEffect, useState} from 'react';
import {MarvelService} from '../../services/MarvelService';
import {CharType} from '../randomChar/RandomChar';
import Spinner from '../preloader/preloader';
import {ErrorMsg} from '../ErrorMsg/ErrorMsg';

type CharListStateType = {
    charactersData: CharType[]
    loading: boolean
    error: boolean,
    pageOffset: number
    charEnded: boolean
}

type CharListPropsType = {
    setSelectedChar: (id: number | null) => void
    charId: number | null
}


export const CharList = (props: CharListPropsType) => {
    const {setSelectedChar, charId} = props
    const marvelService = new MarvelService()
    const [charactersData, setCharactersData] = useState<CharType[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)
    const [pageOffset, setPageOffSet] = useState<number>(marvelService._baseOffset)
    const [charEnded, setCharEnded] = useState<boolean>(false)


    useEffect(() => {
        updateCharListItem()
    }, [pageOffset])

    const onCharLoaded = (charactersData: CharType[]) => {
        setLoading(false)
        setCharactersData(charactersData)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }


    const updateCharListItem = () => {
        setLoading(true)
        marvelService.getAllCharacters(pageOffset)
            .then(res => {
                {
                    res.length < 9 && setCharEnded(true);
                }
                {
                    res.length === 9 && setCharEnded(false);
                }

                onCharLoaded(res)
            })
            .catch(onError)
    }

    const onClickLoadMoreBtnHandler = (offset: number) => {
        setPageOffSet((pageOffset) => pageOffset + offset)
    }

    const correctBtnClassName = loading ? 'button button__secondary button__long' : 'button button__main button__long'


    const isLoading = loading ? <div className={'spinerPage'}><Spinner/></div> :
        <ul className="char__grid"> {charactersData.map(t => <Char charId={charId}
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

import './charList.scss';
import {Char} from './char/Char';
import React, {useEffect, useState} from 'react';
import {useMarvelService} from '../../services/MarvelService';
import {CharType} from '../randomChar/RandomChar';
import {setUpContent} from '../../utils/setContent';


type CharListPropsType = {
    setSelectedChar: (id: number | null) => void
    charId: number | null
}


export const CharList = (props: CharListPropsType) => {
    const {setSelectedChar, charId} = props
    const {getAllCharacters, _baseOffset, clearError, process, setProcess} = useMarvelService()
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
                if(res.length < 9){
                   setCharEnded(true);
                }else{
                    setCharEnded(false)
                }
                onCharLoaded(res)
            })
            .then(() => setProcess('confirmed'))
    }

    const onClickLoadMoreBtnHandler = (offset: number) => {
        setPageOffSet((pageOffset) => pageOffset + offset)
    }

    const correctBtnClassName = process === 'loading' ? 'button button__secondary button__long' : 'button button__main button__long'


    const renderItems=(data:CharType[])=>{
        return( <ul className="char__grid"> {charactersData.map((t) => <Char charId={charId}
                                                                             key={t.id}
                                                                             name={t.name}
                                                                             img={t.thumbnail}
                                                                             id={t.id}
                                                                             setSelectedChar={setSelectedChar}/>)}</ul>)
    }



    return (
        <div className="char__list">
            {setUpContent(process,charactersData,renderItems,'spinerPage')}
            <div className={'btn_block'}>
                {pageOffset !== 210 && <button disabled={process==='loading'} onClick={() => onClickLoadMoreBtnHandler(-9)}
                                               className={correctBtnClassName}>
                    <div className="inner">Previous Page</div>
                </button>}
                {!charEnded && <button disabled={process==='loading'} onClick={() => onClickLoadMoreBtnHandler(9)}
                                       className={correctBtnClassName}>
                    <div className="inner">Next page</div>
                </button>}
            </div>
        </div>
    )
}

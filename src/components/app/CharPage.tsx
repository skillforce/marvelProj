import {RandomChar} from '../randomChar/RandomChar';
import {CharList} from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import decoration from '../../resources/img/vision.png';
import React, {useState} from 'react';
import {ErrorBoundary} from '../errorBoundary/ErrorBoundary';


export const CharPage = () => {


    const [selectedChar, setChar] = useState<number | null>(null)


    const setSelectedChar = (id: number | null) => setChar(id)


    return (
        <div>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList charId={selectedChar} setSelectedChar={setSelectedChar}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </div>
    )
}
import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import decoration from '../../resources/img/vision.png';
import {Component, useState} from 'react';
import {ErrorBoundary} from '../errorBoundary/ErrorBoundary';
import React from 'react';


export const App = () => {


    const [selectedChar, setChar] = useState<number | null>(null)



    const setSelectedChar = (id: number | null) => setChar(id)


    return (
        <div className="app">
            <AppHeader/>
            <main>
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
            </main>

        </div>
    )
}


export default App;
import AppHeader from '../appHeader/AppHeader';
import {RandomChar} from '../randomChar/RandomChar';
import {CharList} from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import decoration from '../../resources/img/vision.png';
import React, {useState} from 'react';
import {ErrorBoundary} from '../errorBoundary/ErrorBoundary';
import ComicsList from '../ComicsList/ComicsList';
import {RoutesInfo} from '../../Routes/Routes';


export const App = () => {


    const [selectedChar, setChar] = useState<number | null>(null)


    const setSelectedChar = (id: number | null) => setChar(id)


    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RoutesInfo/>
            </main>

        </div>
    )
}


export default App;
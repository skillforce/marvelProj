import AppHeader from '../appHeader/AppHeader';
import React from 'react';
import {RoutesInfo} from '../../Routes/Routes';


export const App = () => {

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
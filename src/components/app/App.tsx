import AppHeader from '../appHeader/AppHeader';
import React, {Suspense} from 'react'; //for React.lazy working( fallback giving component to switch with not-working component)
import {RoutesInfo} from '../../Routes/Routes';
import Spinner from '../preloader/preloader';


export const App = () => {

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <Suspense fallback={<Spinner/>}>
                    <RoutesInfo/>
                </Suspense>
            </main>

        </div>
    )
}


export default App;
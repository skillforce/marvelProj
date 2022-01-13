import React, {lazy} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

const SinglePage = lazy(() => import('../components/singlePage/SinglePage'))
const ComicsPage = lazy(() => import('../components/Pages/ComicsPage'))
const NotFoundPage404 = lazy(() => import('../components/Pages/NotFoundPage404'));
const MainPage = lazy(() => import('../components/Pages/MainPage'));


export const PATH = {
    COMICS: '/comics',
    CHARPAGE: '/characters',
    SINGLECOMIC: '/comics/:id',
    SINGLECHARACTER: '/characters/:name'
}


export const RoutesInfo = () => {

    return (
        <div>
            <Routes>
                <Route path={'/marvelProj/' || '/'} element={<Navigate replace to={PATH.CHARPAGE}/>}/>
                <Route path={PATH.CHARPAGE} element={<MainPage/>}/>
                <Route path={PATH.COMICS} element={<ComicsPage/>}/>
                <Route path={`${PATH.SINGLECOMIC}`} element={<SinglePage type={'comic'} />}/>
                <Route path={`${PATH.SINGLECHARACTER}`} element={<SinglePage type={'character'}/>}/>


                <Route path={'*'} element={<NotFoundPage404/>}/>
            </Routes>
        </div>

    )
}
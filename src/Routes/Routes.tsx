import {Navigate, Route, Routes} from 'react-router-dom';
import {MainPage} from '../components/Pages/MainPage';
import {ComicsPage} from '../components/Pages/ComicsPage';
import SingleComic from '../components/singleComic/SingleComic';
import {NotFoundPage404} from '../components/Pages/NotFoundPage404';

export const PATH = {
    COMICS: '/comics',
    CHARPAGE: '/characters',
    SINGLECOMIC: '/singleComic'
}


export const RoutesInfo = () => {

    return (
        <div>
            <Routes>
                <Route path={'/marvelProj/'||'/'} element={<Navigate replace to={PATH.CHARPAGE}/>}/>
                <Route path={PATH.CHARPAGE} element={<MainPage/>}/>
                <Route path={PATH.COMICS} element={<ComicsPage/>}/>
                <Route path={PATH.SINGLECOMIC} element={<SingleComic/>}/>


                <Route path={"*"} element={<NotFoundPage404/>}/>
            </Routes>
        </div>

    )
}
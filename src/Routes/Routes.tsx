import {Navigate, Route, Routes} from 'react-router-dom';
import {CharPage} from '../components/app/CharPage';
import ComicsList from '../components/ComicsList/ComicsList';
import {ComicsPage} from '../components/app/ComicsPage';
import SingleComic from '../components/singleComic/SingleComic';

export const PATH = {
    COMICS: '/comics',
    CHARPAGE: '/characters',
    SINGLECOMIC: '/singleComic'
}


export const RoutesInfo = () => {

    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Navigate replace to={PATH.CHARPAGE}/>}/>
                <Route path={PATH.CHARPAGE} element={<CharPage/>}/>
                <Route path={PATH.COMICS} element={<ComicsPage/>}/>
                <Route path={PATH.SINGLECOMIC} element={<SingleComic/>}/>


                {/*<Route path={"*"} element={<Error404/>}/>*/}
            </Routes>
        </div>

    )
}
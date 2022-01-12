import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../ComicsList/ComicsList';
import {Helmet} from 'react-helmet';
import React from 'react';

const ComicsPage = () => {
    return (
        <div>
            <Helmet>
                <meta name="description" content="Comics"/>
                <title>Comics</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </div>
    )
}


export default ComicsPage;
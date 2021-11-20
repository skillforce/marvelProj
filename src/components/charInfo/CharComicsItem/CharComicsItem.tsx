import './CharComicsItem.scss';
import React from 'react';
import {ComicsItemsType} from '../CharInfo';
import Skeleton from '../../skeleton/Skeleton';

type CharComicsItemPropsType = {
    comics: null | ComicsItemsType
}


export const CharComicsItem = (props: CharComicsItemPropsType) => {
    const {comics} = props;

    if (comics) {
        return (
            <>
                <li className="char__comics-item">
                    {comics.name}
                </li>
            </>
        )
    } else {
        return (<Skeleton/>
        )
    }
}


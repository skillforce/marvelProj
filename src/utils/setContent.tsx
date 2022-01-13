import {ProcessType} from '../hooks/http.hook';
import Spinner from '../components/preloader/preloader';
import {ErrorMsg} from '../components/ErrorMsg/ErrorMsg';
import Skeleton from '../components/skeleton/Skeleton';
import React from 'react';

export const setUpContent = (process: ProcessType, data: any, Component: any, spinnerCustomClass?: string,type?:string) => {
    switch (process) {
        case 'loading':
            return <div className={spinnerCustomClass}><Spinner/></div>
        case 'error':
            return <ErrorMsg/>
        case 'waiting':
            return <Skeleton/>
        case 'confirmed':
            return <Component type={type} data={data}/>
        default:
            throw new Error('Unexpected process state')

    }

}
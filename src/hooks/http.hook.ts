import {useState, useCallback} from 'react';


export type ProcessType = 'waiting' | 'loading' | 'error' | 'confirmed'

export const useHttp = () => {
    const [process, setProcess] = useState<ProcessType>('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        setProcess('loading')
        try {
            const res = await fetch(url, {method, body, headers});
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`)
            }
            const data = await res.json();
            setProcess('confirmed')
            return data;

        } catch (e) {
            if (e instanceof Error) {
                setProcess('error')
                throw e;
            }
        }


    }, [])

    const clearError = useCallback(() => {

        setProcess('loading')
    }, [])

    return {request, clearError, process, setProcess}

}
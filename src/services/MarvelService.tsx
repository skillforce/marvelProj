import {useHttp} from '../hooks/http.hook';

export const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = '0683f9118f5881e432d90247cd0fc519';
    const _baseOffset = 210;

    const getAllCharacters = async (offset: number = _baseOffset) => {
        const res: any = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id: number) => {
        const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
        return _transformCharacter(res)
    }
    const getCharacterByName = async (name: any) => {
        const res = await request(`${_apiBase}characters?name=${name}&apikey=${_apiKey}`);
        return res.data.results.length>0 ? _transformCharacter(res) : error

    }


    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&apikey=${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id: number) => {
        const res = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }


    const _transformComics = (comics: any) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

    const _transformCharacter = (res: any) => {
        let character = res.data ? res.data.results[0] : res
        const {name, description, thumbnail, urls, id, comics} = character
        const correctThumbNail = `${thumbnail.path}.${thumbnail.extension}`
        const correctComicsItems = comics.items.length > 10 ? comics.items.slice(0, 10) : comics.items
        const correctDescription = description ? `${description.slice(0, 210)}...` : 'There is no description for this character'

        return {
            name,
            description: correctDescription,
            thumbnail: correctThumbNail,
            homePage: urls[0].url,
            wikiUrl: urls[1].url,
            id,
            comics: correctComicsItems
        }
    }


    return {
        loading,
        error,
        getAllCharacters,
        getCharacter,
        getCharacterByName,
        _baseOffset,
        clearError,
        getAllComics,
        getComics
    }
}
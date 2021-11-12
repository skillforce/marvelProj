export class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = '0683f9118f5881e432d90247cd0fc519';
    _baseOffset = 210


    getResource = async (url: string) => {
        const res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json()
    }


    getAllCharacters = async (offset:number=this._baseOffset) => {
        const res: any = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&apikey=${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id: number) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
        return this._transformCharacter(res)
    }

    _transformCharacter = (res: any) => {
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


}
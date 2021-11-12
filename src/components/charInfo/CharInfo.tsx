import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import {Component} from 'react';
import {MarvelService} from '../../services/MarvelService';
import {CharType} from '../randomChar/RandomChar';
import React from 'react';
import {CharComicsItem} from './CharComicsItem/CharComicsItem';
import Spinner from '../preloader/preloader';
import {ErrorMsg} from '../ErrorMsg/ErrorMsg';


type CharInfoPropsType = {
    charId: number | null
}
export type ComicsItemsType = {
    resourceURI: string
    name: string
}


type CharInfoCharType = {
    name: null | string
    description: null | string
    thumbnail: string | null
    homePage: string | null
    wikiUrl: string | null
    id: number | null
    comics: null | ComicsItemsType[] | []
}

type CharInfoStateType = {
    char: CharInfoCharType | null
    loading: boolean
    error: boolean
}

type ViewCharInfoPropsType = {
    char: CharInfoCharType
}


class CharInfo extends Component<CharInfoPropsType, CharInfoStateType> {

    state = {
        char: {
            name: null,
            description: null,
            thumbnail: null,
            homePage: null,
            wikiUrl: null,
            id: null,
            comics: null
        } as CharInfoCharType,
        loading: false,
        error: false
    }

    constructor(props: CharInfoPropsType) {
        super(props);


    }

    componentDidUpdate(prevProps: Readonly<CharInfoPropsType>, prevState: Readonly<CharInfoStateType>, snapshot?: any) {
        if (prevProps !== this.props) {
            this.updateChar()
        }
    }


    marvelService = new MarvelService()

    componentDidMount() {

        this.updateChar()
    }


    onCharLoaded = (char: CharInfoCharType) => {

        this.setState({char, loading: false})
    }


    updateChar = () => {
        this.setState({loading: true})
        const {charId} = this.props


        if (!charId) {
            this.setState({loading: false})
        }
        {
            charId && this.marvelService.getCharacter(charId).then(this.onCharLoaded).catch(this.onError)
        }
    }


    onError = () => {
        this.setState({loading: false, error: true})

    }


    render() {

        const {char, loading, error} = this.state


        const isLoading = loading ? <Spinner/> : char.comics || char.name ? <ViewCharInfo char={char}/> :
            <CharComicsItem comics={null}/>


        const isErrorMsg = error ? <ErrorMsg/> : isLoading

        return (
            <div className="char__info">
                {isErrorMsg}
            </div>
        )
    }
}


const ViewCharInfo = (props: ViewCharInfoPropsType) => {
    const {char} = props
    const {name, description, thumbnail, wikiUrl, comics, homePage} = char

    const comicsItems = comics ? comics.length === 0 ? 'Can\'t find anyone comics' : comics.map((t, i) => <CharComicsItem
            key={i} comics={t}/>) :
        <CharComicsItem comics={null}/>
    const notAvailableImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    const correctImgClass = thumbnail === notAvailableImg ? 'char__badBasics' : 'char__basics'

    return (
        <>
            <div className={correctImgClass}>
                <img src={thumbnail ? thumbnail : thor} alt="abyss"/>
                <div>
                    <div className="char__info-name">{name ? name : 'No name'}</div>
                    <div className="char__btns">
                        <a target={'_blank'} href={homePage ? homePage : '#'} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a target={'_blank'} href={wikiUrl ? wikiUrl : '#'} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description ? description : 'no description'}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsItems}
            </ul>
        </>
    )

}

export default CharInfo;
import './randomChar.scss';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import {Component} from 'react';
import {MarvelService} from '../../services/MarvelService';
import Spinner from '../preloader/preloader';
import {ErrorMsg} from '../ErrorMsg/ErrorMsg';


type thumbNailType = {
    path: string
    extension: string
}
type UrlType = {
    type: string
    url: string
}
type CharType = {
    name: null | string
    description: null | string
    thumbnail: string | null
    homePage: string | null
    wikiUrl: string | null
}

type RandomCharStateType = {
    char: CharType
    loading: boolean
    error: boolean
}

class RandomChar extends Component<{}, RandomCharStateType> {

    constructor(props: {}) {
        super(props);
    }

    state = {
        char: {
            name: null,
            description: null,
            thumbnail: null,
            homePage: null,
            wikiUrl: null
        },
        loading: true,
        error: false
    }
    timerId = null as NodeJS.Timeout | null;

    componentDidMount() {
        this.updateChar()
        // this.timerId = setInterval(this.updateChar, 3000)
    }

    componentWillUnmount() {
        if (this.timerId) {
            clearInterval(this.timerId)
        }
    }

    marvelService = new MarvelService()


    onCharLoaded = (char: CharType) => {
        this.setState({char, loading: false})
    }


    updateChar = (id: number = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)) => {
        this.setState({loading: true})
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
        console.log('tick')
    }

    onError = () => {
        this.setState({loading: false, error: true})

    }


    render() {
        const {char, loading, error} = this.state
        const isLoading = loading ? <Spinner/> : <View char={char}/>
        const errorMsg = error ? <ErrorMsg/> : isLoading

        return (
            <div className="randomchar">
                {errorMsg}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={() => this.updateChar()} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

type ViewPropsType = {
    char: CharType
}

const View = (char: ViewPropsType) => {

    const {name, description, thumbnail, homePage, wikiUrl} = char.char;

    return (<div className="randomchar__block">
        <img src={thumbnail ? thumbnail : thor} alt="Random character" className="randomchar__img"/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name ? name : 'Thor'}</p>
            <p className="randomchar__descr">
                {description ? description : 'No descriptions'}
            </p>
            <div className="randomchar__btns">
                <a href={homePage ? homePage : '#'} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wikiUrl ? wikiUrl : '#'} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>)
}

export default RandomChar;
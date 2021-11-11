import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import {Component} from 'react';
import {MarvelService} from '../../services/MarvelService';
import {CharType} from '../randomChar/RandomChar';


type CharInfoPropsType = {
    charId: number | null
}
type CharInfoStateType ={
    char:CharType|null
    loading: boolean
    error: boolean
}


class CharInfo extends Component<CharInfoPropsType, CharInfoStateType> {

    state = {
        char: {
            name: null,
            description: null,
            thumbnail: null,
            homePage: null,
            wikiUrl: null,
            id:null
        } as CharType,
        loading: false,
        error: false
    }

constructor(props:CharInfoPropsType) {
    super(props);
    this.updateChar()
}


    marvelService = new MarvelService()

    componentDidMount() {
        this.updateChar()
    }


    onCharLoaded = (char: CharType) => {
        this.setState({char,loading:false})
    }


    updateChar = () => {
        this.setState({loading: true})
        const {charId} = this.props
        {charId && this.marvelService.getCharacter(charId).then(this.onCharLoaded).catch(this.onError)}

    }


    onError = () => {
        this.setState({loading: false, error: true})

    }



    render() {
        const{char}=this.state
        const{name,description,thumbnail,wikiUrl,id,homePage}=char
        return (
            <div className="char__info">
                <div className="char__basics">
                    <img src={thumbnail?thumbnail:thor} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{name?name: 'No name'}</div>
                        <div className="char__btns">
                            <a href={homePage?homePage:'#'} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wikiUrl?wikiUrl:'#'} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description?description:'no description'}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    <li className="char__comics-item">
                        All-Winners Squad: Band of Heroes (2011) #3
                    </li>
                    <li className="char__comics-item">
                        Alpha Flight (1983) #50
                    </li>
                    <li className="char__comics-item">
                        Amazing Spider-Man (1999) #503
                    </li>
                    <li className="char__comics-item">
                        Amazing Spider-Man (1999) #504
                    </li>
                    <li className="char__comics-item">
                        AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Vengeance (2011) #4
                    </li>
                    <li className="char__comics-item">
                        Avengers (1963) #1
                    </li>
                    <li className="char__comics-item">
                        Avengers (1996) #1
                    </li>
                </ul>
            </div>
        )
    }
}

export default CharInfo;
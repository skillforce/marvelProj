import './charList.scss';
import Char from './char/Char';
import {Component} from 'react';
import {MarvelService} from '../../services/MarvelService';
import {CharType} from '../randomChar/RandomChar';
import Spinner from '../preloader/preloader';
import {ErrorMsg} from '../ErrorMsg/ErrorMsg';

type CharListStateType = {
    charactersData: CharType[]
    loading: boolean
    error: boolean
}

type CharListPropsType = {
    setSelectedChar: (id: number|null) => void
}


class CharList extends Component<CharListPropsType, CharListStateType> {

    state = {
        charactersData: [] as CharType[],
        loading: true,
        error: false
    }


    marvelService = new MarvelService()

    componentDidMount() {
        this.updateCharListItem()
    }

    onCharLoaded = (charactersData: CharType[]) => {
        this.setState({charactersData, loading: false})
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    updateCharListItem() {
        this.setState({loading: true})
        this.marvelService.getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError)
    }


    render() {

        const {charactersData, loading, error} = this.state
        const {setSelectedChar} = this.props

        const isLoading = loading ? <Spinner/> : <ul className="char__grid"> {charactersData.map((t, i) => <Char key={t.id}
                                                                                                                 name={t.name}
                                                                                                                 img={t.thumbnail}
                                                                                                                 id={t.id}
                                                                                                                 setSelectedChar={setSelectedChar}/>)}</ul>


        const isError = error ? <ErrorMsg/> : isLoading;


        return (
            <div className="char__list">
                {isError}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;
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
    error: boolean,
    pageOffset: number
    charEnded: boolean
}

type CharListPropsType = {
    setSelectedChar: (id: number | null) => void
    charId:number|null
}


class CharList extends Component<CharListPropsType, CharListStateType> {
    marvelService = new MarvelService()
    state = {
        charactersData: [] as CharType[],
        loading: true,
        error: false,
        pageOffset: this.marvelService._baseOffset,
        charEnded: false
    }


    componentDidMount = () => {
        this.updateCharListItem()
    }

    componentDidUpdate(prevProps: Readonly<CharListPropsType>, prevState: Readonly<CharListStateType>) {
        {
            prevState.pageOffset !== this.state.pageOffset && this.updateCharListItem()
        }
    }

    onCharLoaded = (charactersData: CharType[]) => {
        this.setState({charactersData, loading: false})
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    updateCharListItem = () => {
        const {pageOffset} = this.state
        this.setState({loading: true})
        this.marvelService.getAllCharacters(pageOffset)
            .then(res => {
                {
                    res.length < 9 && this.setState({charEnded: true})
                }
                {
                    res.length === 9 && this.setState({charEnded: false})
                }

                this.onCharLoaded(res)
            })
            .catch(this.onError)
    }
    onClickLoadMoreBtnHandler = (offset: number) => {
        this.setState(({pageOffset}) => ({pageOffset: pageOffset + offset}))
    }


    render() {

        const {charactersData, loading, error, charEnded, pageOffset} = this.state
        const {setSelectedChar,charId} = this.props

        const correctBtnClassName = loading ? 'button button__secondary button__long' : 'button button__main button__long'


        const isLoading = loading ? <div className={'spinerPage'}><Spinner/></div> :
            <ul className="char__grid"> {charactersData.map(t => <Char charId={charId}
                                                                       key={t.id}
                                                                       name={t.name}
                                                                       img={t.thumbnail}
                                                                       id={t.id}
                                                                       setSelectedChar={setSelectedChar}/>)}</ul>


        const isError = error ? <ErrorMsg/> : isLoading;


        return (
            <div className="char__list">
                {isError}
                <div className={'btn_block'}>
                    {pageOffset !== 210 && <button disabled={loading} onClick={() => this.onClickLoadMoreBtnHandler(-9)}
                                                   className={correctBtnClassName}>
                        <div className="inner">Previous Page</div>
                    </button>}
                    {!charEnded && <button disabled={loading} onClick={() => this.onClickLoadMoreBtnHandler(9)}
                                           className={correctBtnClassName}>
                        <div className="inner">Next page</div>
                    </button>}
                </div>
            </div>
        )
    }
}

export default CharList;
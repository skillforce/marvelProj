import './char.scss';
import abyss from '../../../resources/img/abyss.jpg';
import {Component} from 'react';


type CharPropsType = {
    name: string | null
    img: string | null
    setSelectedChar: (id: number|null) => void
    id:number|null
}


class Char extends Component<CharPropsType> {


    render() {
        const {name, img, setSelectedChar,id} = this.props
        const notAvailableImg = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        const correctImgClass = img === notAvailableImg ? 'char__badItem' : 'char__item'

        return (
            <li  className={correctImgClass}>
                <img onClick={()=>setSelectedChar(id)} src={img ? img : abyss} alt="abyss"/>
                <div className="char__name">{name ? name : 'not found'}</div>
            </li>
        )
    }
}

export default Char;
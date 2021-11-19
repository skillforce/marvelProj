import './CharComicsItem.scss';
import {Component} from 'react';
import React from 'react';
import {ComicsItemsType} from '../CharInfo';
import Skeleton from '../../skeleton/Skeleton';

type CharComicsItemPropsType = {
    comics:null|ComicsItemsType
}


//
// export const CharComicsItem=(props:CharComicsItemPropsType)=>{
//     const{comics}=props;
//
//     if(comics){
//         return (
//             <>
//                 <li className="char__comics-item">
//                     {comics.name}
//                 </li>
//             </>
//         )
//     }else{
//         return(<Skeleton/>
//         )
//     }
// }



export class CharComicsItem extends Component<CharComicsItemPropsType, {}> {


    render() {
        const{comics}=this.props


      if(comics){
          return (
              <>
                  <li className="char__comics-item">
                      {comics.name}
                  </li>
              </>
          )
      }else{
          return(<Skeleton/>
          )
      }



    }
}


import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import decoration from '../../resources/img/vision.png';
import {Component} from 'react';

type AppStateType ={
    selectedChar:number|null
}


class App extends Component<{},AppStateType> {

    state = {
        selectedChar:null as null|number
    }

    setSelectedChar=(id:number|null)=>{
        this.setState({selectedChar:id})
    }


    render() {
        const{selectedChar}=this.state
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList setSelectedChar={this.setSelectedChar}/>
                        <CharInfo charId={selectedChar}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;
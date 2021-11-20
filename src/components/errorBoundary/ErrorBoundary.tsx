import {Component} from 'react';
import {ErrorMsg} from '../ErrorMsg/ErrorMsg';


type ErrorBoundaryStateType = {
    error: boolean
}


export class ErrorBoundary extends Component<{}, ErrorBoundaryStateType> {
    state = {
        error: false
    }


    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log(errorInfo, error)
        this.setState({error: true})
    }


    render() {
        const {error} = this.state
        if (error) {
            return (
                <ErrorMsg/>
            )
        }

        return this.props.children;

    }
}


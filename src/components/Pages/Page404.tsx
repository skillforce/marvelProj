import {Link} from 'react-router-dom';
import {ErrorMsg} from '../ErrorMsg/ErrorMsg';

export const Page404 = () => {
    return (
        <div>
            <ErrorMsg/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <Link style={{
                'display': 'block',
                'textAlign': 'center',
                'fontWeight': 'bold',
                'fontSize': '24px',
                'marginTop': '30px'
            }} to="/">Back to main page</Link>
        </div>
    )
}


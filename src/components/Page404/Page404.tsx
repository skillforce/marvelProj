import {NavLink, useNavigate} from 'react-router-dom';
import {ErrorMsg} from '../ErrorMsg/ErrorMsg';
import {PATH} from '../../Routes/Routes';



export const Page404 = () => {
    let navigate = useNavigate();




    return (
        <div>
            <ErrorMsg/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <button style={{
                'display': 'block',
                'textAlign': 'center',
                'fontWeight': 'bold',
                'fontSize': '24px',
                'padding':'10px 35px',
                'borderRadius':'12px',
                'margin':'30px auto'
            }} onClick={()=>navigate(-1)}>Back</button>
        </div>
    )
}


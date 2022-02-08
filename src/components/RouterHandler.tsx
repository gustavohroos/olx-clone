import { Route } from 'react-router-dom';
import { isLogged } from '../helpers/authHandler';

export default ({path, ...rest}) => {
    let logged = isLogged();
    let authorized = (rest.private && !logged) ? false : true;

    if(authorized){
        return (
            <Route 
                {...rest}
                path={path}
            />
        )
    } else {
        return (
            <Route 
                {...rest}
                path='/signin'
            />
        )
    }
}
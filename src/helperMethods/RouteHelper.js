import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';
import VerifyAccount from '../components/auth/VerifyAccount';
import AddMovie from '../components/movies/AddMovie';
import GetMovies from '../components/movies/GetMovies';
import MovieDetails from '../components/movies/MovieDetail';
import EditMovie from '../components/movies/EditMovie';

const RouteHelper = () => {
    return ( 
        <Switch>
            <Route exact path='/' component={GetMovies}  />
            <Route exact path='/signin' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/verifyaccount' component={VerifyAccount}  />
            <Route exact path='/movie/add' component={AddMovie}  />
            <Route exact path='/movie/get/:id' component={MovieDetails}  />
            <Route exact path='/movie/edit/:id' component={EditMovie} />
        </Switch>
     );
}
 
export default RouteHelper;
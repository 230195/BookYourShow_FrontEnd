import React, {useState, useEffect,  useContext} from 'react';
import { NavbarContext } from '../../context/NavbarContext';
import {Box, Typography, Card, CardActionArea, CardActions, CardContent, CardMedia,
    Grid, Button } from '@material-ui/core';
import {Skeleton } from '@material-ui/lab';
import axios from 'axios';
import { useStyles } from '../layout/Style';
import {Link} from 'react-router-dom';
import { AxiosConstant } from '../../constants/AxiosConstants';


const MovieDetails = (props) => {
    const[movieState, setMovieState] = useState({
        movie: {},
        isLoaded : false});
    const{movie, isLoaded} = movieState;
    const classes = useStyles();
    const {navbar} = useContext(NavbarContext);

    if(!navbar.isUserLoggedIn){
        props.history.push('/signin');
    }

    useEffect(() => {
        if(!navbar.isUserLoggedIn){
            props.history.push('/signin');
            return
        }
        axios.get(`movie/getMovie/${props.match.params.id}`)
            .then(res => {
                setMovieState({
                    ...movieState,
                    isLoaded: true,
                    movie: res.data?.data
                });
            })
    }, []);


    return ( 
        <div className='text-align-center'> 
        <h2 className="heading-constant">Movie Details</h2>
        <Card className='card-class'>
        {/* <CardActionArea> */}
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}  >
            {isLoaded ? 
            (   
                <img id="myImg" src={`${AxiosConstant.apiUrl}${movie.thumbnailUrl.split('\\').join('/')}`}  alt="Thumbnail" height="auto" width="100%" />
               
            ): 
            (
                <Skeleton variant="rect" width="100%">
                    <div style={{ paddingTop: '170px' }} />
                </Skeleton>
            )}
            </Grid>
            <Grid item xs={12} sm={6} md={8}  >
            <CardContent >
            
            {isLoaded ? (
                <Typography gutterBottom variant="h5" component="h2">
                {movie.movieName }
                <Link to={`/movie/edit/${props.match.params.id}`}>
                    <Button color="primary" style={{float:"right"}}>
                        Edit
                    </Button>
                </Link>
                </Typography>): (
                <Skeleton  height={10} width="100%" />
            )}
            {isLoaded ? (
                <Typography variant="body2" color="textSecondary" component="p">
                    {movie.movieSummary }
                </Typography>
            ): (
                <div>
                    <br/>
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} width="80%" />   
                </div>
                
            )}
            
            </CardContent>
            </Grid>
            </Grid>
           
        {/* </CardActionArea> */}
        </Card>
        </div>
     );
}
 
export default MovieDetails;
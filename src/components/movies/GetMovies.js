import InfiniteLoader from 'react-infinite-loader'
import React, {useEffect, useState, useContext} from 'react';
import { MovieSharp } from '@material-ui/icons';
import {Link} from 'react-router-dom';
import {Card, CardActionArea, CardActions, CardContent, CardMedia,
    Grid, Typography, Button} from '@material-ui/core';
import axios from 'axios';
import { useStyles } from '../layout/Style';
import { AxiosConstant } from '../../constants/AxiosConstants';
import  MovieSummary from './MovieSummary';
import { NavbarContext } from '../../context/NavbarContext';

const GetMovies = (props) => {
    const [movieState, setMovies] = useState({movies : [], pageNumber:1, pageSize:10, isLast: false, isLoaded: false});
    const classes = useStyles();
    const {navbar} = useContext(NavbarContext);

    if(!navbar.isUserLoggedIn){
        props.history.push('/signin');
    }
    const getMoviesByPage = () =>{
        setMovies({
            ...movieState,
            isLoaded: false
        });
        axios.get(`Movie/GetMovieByPage?pageNumber=${movieState.pageNumber}&pageSize=${movieState.pageSize}`)
        .then(res => {
            let result = res.data;
            if(result.data){
                const itemArr = [];
                result.data.forEach((item, index) =>{
                    itemArr.push(item);
                })
                setMovies({
                    ...movieState,
                    movies: [...movieState.movies, ...itemArr],
                    pageNumber: (movieState.pageNumber+1),
                    isLoaded: true
                })
            }else{
                setMovies({
                    ...movieState,
                   isLast: true,
                   isLoaded: true
                })
            }
           
        })
    }

   
    let i;
    let  item =[]
    for(i=0; i>=-6;  i--){
        item.push(i);
    }

    const showEmptyLoader =  item.map((id) => {
                return (
                    <MovieSummary movie={undefined} key={id} isLoaded={false}/>
                )
            });

    function loadItems() {
        getMoviesByPage()
    }
     
    function handleVisit () {
        if(!movieState.isLast)
            loadItems()
    }

    useEffect(() => {
        if(!navbar.isUserLoggedIn){
            props.history.push('/signin');
            return
        }
        getMoviesByPage();
    }, [])

    
    const cards = movieState.movies.map((movie) => {
        return (
            <MovieSummary  key={movie.id} movie={movie} isLoaded={true}/>
        )
    });
    

    return ( 
        <div className='text-align-center'> 
            <h2 className="heading-constant">Movies</h2>
            <Grid container spacing={3}>
            { cards }
            
            {!movieState.isLoaded ? 
                showEmptyLoader : null}
            </Grid>
            {!movieState.isLast ? (
                <Button size="small" color="primary" onClick={getMoviesByPage}>
                    Load More
                </Button>
            ): null}
            
            <InfiniteLoader onVisited={ () => handleVisit() } />
            
        </div>
     );
}
 
export default GetMovies;
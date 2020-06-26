import React,  { useState, useEffect, useContext} from "react";
import {TextField, FormControl, Grid,
     Card, Typography, CardContent, Button } from '@material-ui/core';
import clsx from 'clsx';
import {useStyles} from '../layout/Style';
import {Skeleton } from '@material-ui/lab';
import axios from "axios";
import {CloudUpload as CloudUploadIcon} from '@material-ui/icons';
import { toast } from "react-toastify";
import { NavbarContext } from "../../context/NavbarContext";
import { AxiosConstant } from '../../constants/AxiosConstants';


const EditMovie = (props) => {
    const[movieState, setMovieState] = useState({
        movie: {},
        isLoaded : false,
        isimageUpdated: false
    });
    
    const {navbar} = useContext(NavbarContext);
    const{movie, isLoaded, isimageUpdated} = movieState;

    if(!navbar.isUserLoggedIn){
        props.history.push('/signin');
    }
    const classes = useStyles();

    const handleChange = () => (event) => {
        console.log(event.target);
        setMovieState({...movieState, movie:{
            ...movie,
            [event.target.id]: event.target.value 
        }
    });
        console.log(movie)
    };

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
                    movie: {
                        ...res.data?.data,
                        thumbnail: res.data?.data?.thumbnailSrc
                    }
                });
            })
    }, []);

    const handleThumbnailClick = (e) => {
        document.getElementById('inp_thumbnail').click();
        
    }
    
    const fileSelectHandler = (event) => {
        if(event.target.files.length){
            setMovieState({
                ...movieState,
                 movie:{
                     ...movie,
                     thumbnail: event.target.files[0]
                 },
                 isimageUpdated: true,
                 thumbnailSrc: URL.createObjectURL(event.target.files[0])
                });
            var image = document.getElementById('inp_thumbnail');
            document.getElementById('myImg').src = URL.createObjectURL(event.target.files[0]);
        }
    };

    const handleSubmit= (e) => {
        e.preventDefault();
        console.log(movie);
        if((movie.thumbnail && isimageUpdated)|| !isimageUpdated){
            let formData = new FormData();
            if(isimageUpdated){
                formData.append('image', movie.thumbnail);
            }
            formData.append('id', props.match.params.id);
            formData.append('MovieName', movie.movieName);
            formData.append('LaunchDate', movie.launchDate);
            formData.append('MovieSummary', movie.movieSummary);
            
            axios.post("Movie/EditMovies", formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                } 
            }).then(
                res => {
                    toast.success(res.data?.message);
                }
            );
        }else{
            toast.error("Please select the thumbnail")
        }

    }

    return (
        <div className='text-align-center'> 
        <h2 className="heading-constant">Movie Details</h2>
        <form onSubmit={handleSubmit}>
        <Card className='card-class'>
        {/* <CardActionArea> */}
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}  >
            {isLoaded ? 
            (   !isimageUpdated ? 
                (
                    <img id="myImg" src={`${AxiosConstant.apiUrl}${movie.thumbnailUrl.split('\\').join('/')}`}  alt="Thumbnail" height="auto" width="100%" />
                ):
                (<img id="myImg" src={movieState.thumbnailSrc}  alt="Thumbnail" height="auto" width="100%" />)
               
            ): 
            (
                <Skeleton variant="rect" width="100%">
                    <div style={{ paddingTop: '170px' }} />
                </Skeleton>
            )}
            </Grid>
            <Grid item xs={12} sm={6} md={8}  >
            <CardContent >
            <Grid container spacing={3}>
           {isLoaded ? ( <Grid item xs={12} sm={6} md={6}>
                <Button style={{float:"left"}} variant="contained" color="default" onClick={handleThumbnailClick} className={classes.button}
                    startIcon={<CloudUploadIcon/>}
                >
                   Change Thumbnail
                    <input id="inp_thumbnail"  accept="image/*" type="file" style={{ display: "none" }}  onChange={fileSelectHandler} />
                </Button>
                </Grid>): null}
            {isLoaded ? (
                
                <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth   className={clsx(classes.margin, classes.whiteBackground)} variant="outlined">
                    <TextField required type="text" id="movieName" label="Movie Name" variant="outlined"
                    onChange={handleChange()} placeholder="Enter Movie Name" value={movie.movieName}/>
                </FormControl>
                </Grid>
        
                
                
                ): (
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={6}>
                            <Skeleton  height={40} width="30%" />   
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            
                            <Skeleton  height={40} width="100%" />
                        </Grid>
                    </Grid>
                
            )}
            {isLoaded ? (
                
                <Grid item xs={12} sm={12} md={12}>
                <FormControl fullWidth  className={clsx([classes.margin, classes.whiteBackground])} variant="outlined">
                    <TextField
                        id="movieSummary"
                        required
                        label="Multiline"
                        multiline
                        rowsMax={6}
                        rows={6}
                        onChange={handleChange()}
                        variant="outlined"
                        value={movie.movieSummary}
                        />
                    </FormControl>
                </Grid>
            ): (
                
                <Skeleton variant="rect" width="100%">
                    <div style={{ paddingTop: '125px' }} />
                </Skeleton>
                
            )}
            {isLoaded ? (
                <Grid item xs={6} sm={6}>
                        <FormControl  fullWidth  className={clsx(classes.margin)} variant="outlined">
                            <Button type="submit" className="login-button" variant="contained" color="primary">
                                Save Movie
                            </Button>
                        </FormControl>
                    </Grid>
            ): null}
            </Grid>
            </CardContent>
            </Grid>
            </Grid>
           
        {/* </CardActionArea> */}
        </Card>
        </form>
        </div>
    );
}
    
export default EditMovie;
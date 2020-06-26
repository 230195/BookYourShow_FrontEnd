import React,  { useState, useContext} from "react";
import {TextField, FormControl, Grid,
     Button, Card} from '@material-ui/core';
import clsx from 'clsx';
import {useStyles} from '../layout/Style';
import {Skeleton } from '@material-ui/lab';
import {CloudUpload as CloudUploadIcon} from '@material-ui/icons';
import axios from "axios";
import { toast } from "react-toastify";
import { NavbarContext } from "../../context/NavbarContext";


const AddMovie = (props) => {
    const [movie, setMovie] = useState({
        movieName: '',
        launchDate: setDefaultDate(),
        thumbnail: '',
        movieSummary: '',
        mediaUrls: []
    })
    
    const {navbar} = useContext(NavbarContext);

    if(!navbar.isUserLoggedIn){
        props.history.push('/signin');
    }
    const classes = useStyles();

    const handleChange = () => (event) => {
        console.log(event.target);
        setMovie({...movie, [event.target.id]: event.target.value });
        console.log(movie)
    };

    const fileSelectHandler = (event) => {
        if(event.target.files.length){
            setMovie({...movie,
                thumbnail: event.target.files[0]
                });
            var image = document.getElementById('inp_thumbnail');
            document.getElementById('myImg').src = URL.createObjectURL(event.target.files[0]);
            document.getElementById('myImg').style.display = "block";
        }
    };
    
    const handleSubmit= (e) => {
        e.preventDefault();
        console.log(movie);
        if(movie.thumbnail){
            let formData = new FormData();
            formData.append('image', movie.thumbnail);
            formData.append('MovieName', movie.movieName);
            formData.append('LaunchDate', movie.launchDate);
            formData.append('MovieSummary', movie.movieSummary);
            
            axios.post("Movie/AddMovies", formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                } 
            }).then(
                res => {
                    toast.success(res.data?.Message);
                    props.history.push('/');
                }
            );
        }else{
            toast.error("Please select the thumbnail")
        }

    }

    function setDefaultDate(){
        const dateNow = new Date(); // Creating a new date object with the current date and time
        const year = dateNow.getFullYear(); // Getting current year from the created Date object
        const monthWithOffset = dateNow.getMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
        const month = // Setting current Month number from current Date object
            monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
                ? `0${monthWithOffset}`
                : monthWithOffset;
        const date =
            dateNow.getDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
                ? `0${dateNow.getDate()}`
                : dateNow.getDate();

        const materialDateInput = `${year}-${month}-${date}`
        return materialDateInput;
    }

    const handleThumbnailClick = (e) => {
        document.getElementById('inp_thumbnail').click();
        
    }

    return ( 
        <div className='text-align-center'>
            <h2 className="heading-constant">Add Movie</h2>
            <form onSubmit={handleSubmit} >
            <Card className='container'>
                <Grid container className="text-align-center"  direction="column"  justify="center"  alignItems="center" spacing={0}>
                    
                    <Grid item xs={12}>
                        
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12}>
                                <Grid container className="text-align-center"  justify="center"  alignItems="center">
                                    <Grid item xs={12} sm={6}  >
                                        <Button variant="contained" color="default" onClick={handleThumbnailClick} className={classes.button}
                                            startIcon={<CloudUploadIcon/>}
                                        >
                                            Thumbnail
                                            <input id="inp_thumbnail"  accept="image/*" type="file" style={{ display: "none" }}  onChange={fileSelectHandler} />
                                        </Button>                    
                            </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth  className={clsx(classes.margin, classes.whiteBackground)} variant="outlined">
                                    <TextField required type="text" id="movieName" label="Movie Name" variant="outlined"
                                    onChange={handleChange()} placeholder="Enter Movie Name" />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}  >
                                <FormControl fullWidth  className={clsx([classes.margin, classes.whiteBackground])} variant="outlined">
                                    <TextField
                                        id="launchDate"
                                        label="Launch Date"
                                        variant="outlined"
                                        type="date"
                                        onChange={handleChange()}
                                        defaultValue={setDefaultDate()}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item sm={4}>
                                <img id="myImg" src="" className="movie-thumbnail" alt="Thumbnail" height="auto" width="100%" />
                               
                            </Grid>
                            <Grid item sm={8}>
                            <FormControl fullWidth  className={clsx([classes.margin, classes.whiteBackground])} variant="outlined">
                            <TextField
                                id="movieSummary"
                                required
                                label="Multiline"
                                multiline
                                rowsMax={6}
                                rows={4}
                                onChange={handleChange()}
                                variant="outlined"
                                />
                                </FormControl>
                            </Grid>
                        </Grid> 
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <FormControl  fullWidth  className={clsx(classes.margin)} variant="outlined">
                            <Button type="submit" className="login-button" variant="contained" color="primary">
                                Add Movie
                            </Button>
                        </FormControl>
                    </Grid>
            
                </Grid>
            </Card>
            </form>
        </div>
    );
}
    
export default AddMovie;
import React from 'react';
import {Typography, Card, CardActionArea, CardActions, CardContent, CardMedia,
    Grid, Button  } from '@material-ui/core';
import {Skeleton } from '@material-ui/lab';
import { useStyles } from '../layout/Style';
import { AxiosConstant } from '../../constants/AxiosConstants';
import {Link} from 'react-router-dom';

const MovieSummary = ({movie, isLoaded}) => {
    const classes = useStyles();
    return ( 
        <Grid item xs={12} sm={6} md={4}  >
                <Card className='card-class'>
                    <Link to={ isLoaded? '/movie/get/'+ movie.id: ''}>
                    <CardActionArea>
                        {isLoaded ? 
                        (
                            <CardMedia
                                className={classes.media}
                                image= {`${AxiosConstant.apiUrl}${movie.thumbnailUrl.split('\\').join('/')}`}
                                title={movie.movieName } />
                        ): 
                        (
                            <Skeleton variant="rect" width="100%">
                                <div style={{ paddingTop: '170px' }} />
                            </Skeleton>
                        )}
                        <CardContent className={`${classes.media} ${classes.cardContent} cardContent`}>
                       
                        {isLoaded ? (
                            <Typography gutterBottom variant="h5" component="h2">
                            {movie.movieName }
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
                    </CardActionArea>
                    </Link>
                    <CardActions>
                    
                    {isLoaded ? (
                        <Link to={'/movie/get/'+ movie.id}>
                            <Button size="small" color="primary" >
                                Learn More
                            </Button>
                        </Link>
                    ): (
                        <Skeleton animation="wave" height={10} width="30%" />
                    )}
                    </CardActions>
                </Card>
            </Grid>
     );
}
 
export default MovieSummary;
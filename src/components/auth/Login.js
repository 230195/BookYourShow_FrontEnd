import React,  { useState, useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {TextField, FormControl, InputAdornment, InputLabel, Grid,
     IconButton, OutlinedInput, Button, } from '@material-ui/core';
import {VisibilityOff, Visibility, LockRounded, apiRound} from '@material-ui/icons';
import clsx from 'clsx';
import axios from 'axios';
import  {AxiosConstant} from '../../constants/AxiosConstants';
import {setCookie} from '../../helperMethods/CookieHelper';
import Theater from  '../../media/images/theater1.jpg';
import TheaterMobile from  '../../media/images/theater2.jpg';
import {isTablet, isMobile, BrowserView, MobileOnlyView, TabletView} from 'react-device-detect';
import {Link} from 'react-router-dom';
import {NavbarContext} from '../../context/NavbarContext';
import {useStyles} from '../layout/Style';
import toast from '../../axios.interceptor';
 
const Login = (props) => {
    const [login, setLogin] = useState({
        email: '',
        password: '',
        showPassword: false
    })

    const {navbar, setUserLogIn} = useContext(NavbarContext);

    if(navbar.isUserLoggedIn){
        props.history.push('/');
    }

    const classes = useStyles();
    
    const handleChange = (prop) => (event) => {
        setLogin({...login, [event.target.id]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
        setLogin({...login, showPassword: !login.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };  

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('auth/Login/', {Email: login.email,Password: login.password})
            .then(res => {
                setCookie(AxiosConstant.token,res.data.data.token, res.data.data.expireDate) 
                setUserLogIn(true, res.data.data.fullName);
                toast.success(`Welcome ${res.data.data.fullName}. We are looking forward to host you!!`)
                props.history.push('/');
            })
    }

    const loginDom = (
        <Grid container className="text-align-center"  direction="column" justify="center"  alignItems="center" spacing={0}>
            <h1 style={{color:"#607d8b"}} className='heading-login'>Book Your Show</h1>
            <LockRounded style={{color:"#607d8b"}} fontSize="large" />
            <h3 style={{color:"#607d8b"}}>LOGIN</h3>
            <Grid item >
                <FormControl  fullWidth  className={clsx([classes.margin, classes.whiteBackground])} variant="outlined">
                    <TextField required type="email" id="email" label="User Name" variant="outlined"
                    onChange={handleChange('password')} placeholder="Enter Your User Name"/>
                </FormControl>
                <FormControl   fullWidth  className={clsx([classes.margin, classes.whiteBackground])} variant="outlined">
                    <InputLabel htmlFor="password" required>Password</InputLabel>
                    <OutlinedInput 
                        id="password"
                        required
                        type={login.showPassword ? 'text' : 'password'}
                        value={login.password}
                        autoComplete="true"
                        onChange={handleChange('password')}
                        placeholder="Enter Your Password"
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword} edge="end" >
                            {login.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                        labelWidth={80}
                    />
                </FormControl>
                <FormControl  fullWidth  className={clsx([classes.margin])} variant="outlined">
                    <Button type="submit" className="login-button" variant="contained" color="primary">
                        Login
                    </Button>
                </FormControl>
                <h4 className='login-form'>--OR--</h4>
                <FormControl   fullWidth  className={clsx(classes.margin)} variant="outlined">
                    <Link to='/signup'>
                        <Button type="submit" className="login-button" variant="contained" color="default">
                                Sign Up
                        </Button>
                    </Link>
                </FormControl>
            </Grid>
        </Grid>
    );
    
    return ( 
        <form className={classes.margin} onSubmit={handleSubmit} autoComplete="false" >
          {isMobile || isTablet ? (null):(<BrowserView>
                <Grid container spacing={3}>
                    <Grid item sm={6} md={4}  className="login-dom" >
                        {loginDom}
                    </Grid>
                    <Grid item sm={6} md={8} className="image-dom">
                        <Grid  className='grid-background-theater'>
                            <img src={Theater}  className='background-theater'/>
                        </Grid>  
                    </Grid>
                </Grid>
            </BrowserView>)}
            <TabletView >
                <Grid container spacing={3} >
                    <Grid item xs={6} className="login-dom">
                        {loginDom}
                    </Grid>
                  
                        <div>
                            <Grid item  md={6} className="login-theme-tablet" />
                        </div>
                        
                    
                    <Grid item xs={12} className={ ` background-theater-tablet background-theater  image-dom`}>
                        <Grid>
                            {/* <img src={TheaterMobile}  className=''/> */}
                        </Grid>  
                    </Grid>
                </Grid>
            </TabletView>
            <MobileOnlyView>
                <Grid container spacing={3}>
                    <Grid item xs={12} className="login-dom"> 
                        {loginDom}
                    </Grid>
                    <Grid item xs={12} className={ ` background-theater-mobile  background-theater image-dom`}>
                        <Grid>
                            {/* <img src={TheaterMobile}  className=''/> */}
                        </Grid>  
                    </Grid>
                </Grid>
            </MobileOnlyView>
            
        </form>
     );
}
 
export default Login;
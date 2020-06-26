import React,  { useState, useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {TextField, FormControl, InputAdornment, InputLabel, Grid,
     IconButton, OutlinedInput, Button, } from '@material-ui/core';
import {VisibilityOff, Visibility, LockRounded} from '@material-ui/icons';
import clsx from 'clsx';
import axios from 'axios';
import  {AxiosConstant} from '../../constants/AxiosConstants';
import {setCookie} from '../../helperMethods/CookieHelper';
import Theater from  '../../media/images/theater1.jpg';
import {isTablet, isMobile, BrowserView, MobileOnlyView, TabletView} from 'react-device-detect';
import {Link} from 'react-router-dom';
import  toast from "../../axios.interceptor";
import {useStyles} from '../layout/Style';
import { NavbarContext } from "../../context/NavbarContext";

const SignUp = (props) => {
    const [signup, setSignUp] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        showPassword: false,
    })

    const {navbar} = useContext(NavbarContext);

    if(navbar.isUserLoggedIn){
        props.history.push('/');
    }

    const classes = useStyles();

    const handleChange = (prop) => (event) => {
        setSignUp({...signup, [event.target.id]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
        setSignUp({...signup, showPassword: !signup.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };  

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('auth/Register/', {
            Email: signup.email,
            Password: signup.password,
            ConfirmPassword:signup.confirmPassword,
            FullName: signup.fullName
        })
        .then(res => {
            toast.success("Successfully registered, Please verify your Email Id");
            props.history.push('/verifyaccount');
        })
    }

    const signupDom = (
        <Grid container className="text-align-center"  direction="column" justify="center"  alignItems="center" spacing={0}>
            <h1 style={{color:"#607d8b"}} className='heading-login'>Book Your Show</h1>
            <LockRounded style={{color:"#607d8b"}} fontSize="large" />
            <h3 style={{color:"#607d8b"}}>SIGN UP</h3>
            <Grid item >
                <FormControl fullWidth  className={clsx(classes.margin, classes.whiteBackground)} variant="outlined">
                    <TextField required type="email" id="email" label="User Name" variant="outlined"
                    onChange={handleChange('password')} placeholder="Enter Your email id"/>
                </FormControl>
                <FormControl fullWidth  className={clsx(classes.margin, classes.whiteBackground)} variant="outlined">
                    <TextField required type="text" id="fullName" label="Full Name" variant="outlined"
                    onChange={handleChange('password')} placeholder="Enter Your Full Name"/>
                </FormControl>
                <FormControl fullWidth  className={clsx(classes.margin, classes.whiteBackground)} variant="outlined">
                    <InputLabel htmlFor="password" required>Password</InputLabel>
                    <OutlinedInput 
                        id="password"
                        required
                        type={signup.showPassword ? 'text' : 'password'}
                        value={signup.password}
                        autoComplete="true"
                        onChange={handleChange('password')}
                        placeholder="Enter Your Password"
                        required
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {signup.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                        labelWidth={80}
                    />
                </FormControl>
                <FormControl fullWidth  className={clsx(classes.margin, classes.whiteBackground)} variant="outlined">
                    <InputLabel htmlFor="confirmPassword" required>Password</InputLabel>
                    <OutlinedInput 
                        id="confirmPassword"
                        required
                        type='password'
                        value={signup.confirmPassword}
                        autoComplete="true"
                        onChange={handleChange('confirmPassword')}
                        placeholder="Confirm Password"
                        labelWidth={80}
                        required
                    />
                </FormControl>
                <FormControl  fullWidth  className={clsx(classes.margin)} variant="outlined">
                    <Button type="submit" className="login-button" variant="contained" color="primary">
                        SIGN UP
                    </Button>
                </FormControl>
                <h4 className='login-form'>--OR--</h4>
                <FormControl   fullWidth  className={clsx(classes.margin)} variant="outlined">
                    <Link to='/signin'>
                        <Button type="submit" className="login-button" variant="contained" color="default">
                                LOGIN
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
                        {signupDom}
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
                        {signupDom}
                    </Grid>
                  
                        <div>
                            <Grid item  md={6} className="login-theme-tablet" />
                        </div>
                        
                    
                    <Grid item xs={12} className={ ` signup-background-theater-tablet background-theater  image-dom`}>
                        <Grid>
                            {/* <img src={TheaterMobile}  className=''/> */}
                        </Grid>  
                    </Grid>
                </Grid>
            </TabletView>
            <MobileOnlyView>
                <Grid container spacing={3}>
                    <Grid item xs={12} className="login-dom"> 
                        {signupDom}
                    </Grid>
                    <Grid item xs={12} className={ ` signup-background-theater-mobile  background-theater image-dom`}>
                        <Grid>
                            {/* <img src={TheaterMobile}  className=''/> */}
                        </Grid>  
                    </Grid>
                </Grid>
            </MobileOnlyView>
            
        </form>
     );
}
 
export default SignUp;
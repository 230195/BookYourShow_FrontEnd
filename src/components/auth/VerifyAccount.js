import React, {useState, useContext, useEffect} from 'react';
import {Grid, Button } from '@material-ui/core';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import  {AxiosConstant} from '../../constants/AxiosConstants';
import {setCookie} from '../../helperMethods/CookieHelper';
import { NavbarContext } from '../../context/NavbarContext';
import  toast from "../../axios.interceptor";

const VerifyAccount = (props) => {
    const [message, setMessage] = useState('Please verify your account and then  ');
    const {navbar,setUserLogIn} = useContext(NavbarContext);
    const {userId, token} = queryString.parse(props.location.search);

    useEffect(() => {
        if(userId){
            setMessage("Verifying your account. Please wait");
            let url = `auth/ConfirmEmail?userId=${userId}&token=${encodeURIComponent(token)}`;
            axios.get(url)
                .then(res => {
                    toast.success("Congratulation, your account is now verified.");
                    setMessage("Account Verified!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    setCookie(AxiosConstant.token,res.data?.data?.token, res.data.data.expireDate) 
                    setUserLogIn(true, res.data?.data?.fullName);
                    props.history.push('/');
                })
                .catch(err => setMessage("Verification Failed."));
        }
    },[]);

    return ( 
        <Grid container spacing={3}>
            <Grid item xs={12} className="login-dom"> 
                <h3>
                    {message} &nbsp;
                    <Link to='/signin'>
                        <Button type="submit" variant="outlined"   color="primary">
                            LOGIN
                        </Button>
                    </Link>
                </h3>
            </Grid>
            <Grid item xs={12} className={ ` signup-background-theater-mobile  background-theater image-dom`}>
                <Grid>
                    {/* <img src={TheaterMobile}  className=''/> */}
                </Grid>  
            </Grid>
        </Grid>
     );
}
 
export default VerifyAccount;
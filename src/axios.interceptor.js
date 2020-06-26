import  {AxiosConstant} from './constants/AxiosConstants';
import { getCookie } from './helperMethods/CookieHelper';
import {toast} from "react-toastify";
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function showLoader(){
    document.getElementById('gloabal-api-loader').style.display='block';
    document.getElementById('app-body').style.opacity= '0.8';
}

function hideLoader(){
    document.getElementById('gloabal-api-loader').style.display='none';
    document.getElementById('app-body').style.opacity= '1';
}

function showValidationErrorMessages(response){
    if(response?.data?.errors){
        let errors = response.data.errors;
        let keys = Object.keys(errors);
        let errorMessage;
        let count = 0;
        keys.forEach(key => {
            count=0;
            errorMessage = '';
            let message = errors[key].map(error => {
                count++;
                return (
                    <div>
                        {count}.{error}
                        <br />
                    </div>
                )
            })
            toast.error(
                <div>
                    Validation for {key} : 
                    <br /> 
                    {message}
                </div>
                , {
                autoClose: 20000
            });
        });
        
    }

    if(response === undefined){
        toast.error("Not able to connect to the server. please try again after sometime!!!!");
    }
}

export const requestInterceptor = (request) =>{
    const token = getCookie(AxiosConstant.token);
    if(token){
        request.headers['Authorization'] = 'Bearer ' + token;;
    }
    
    request.url = AxiosConstant.apiUrl+request.url;
    showLoader();
    return request;
}

export const requestErrorInterceptor = (error) => {
    hideLoader();
    console.log("failed at request end", error);
    return Promise.reject(error)
}

export const responseInterceptor = (response) =>{
    hideLoader();
    console.log("response is ", response);
    return response;
}

export const responseErrorInterceptor = (error) => {
    hideLoader();
    showValidationErrorMessages(error.response);
    toast.error(error.response?.data?.message)
    return Promise.reject(error)
}

export default toast;
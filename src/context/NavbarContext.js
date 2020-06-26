import React, {createContext, useEffect, useState} from 'react';
import {getCookie, deleteCookie} from '../helperMethods/CookieHelper'
import { AxiosConstant } from '../constants/AxiosConstants';
import  toast from "../axios.interceptor";

export const NavbarContext = createContext();

const NavbarContextProvider = (props) =>{
    const [navbar, setNavbar] = useState(() =>{
            let localData =  localStorage.getItem("navbar");
            localData = localData ? JSON.parse(localData) : {
                isNavOpen: false,
                isUserLoggedIn: false,
                userName: ''
            };
            localData.isUserLoggedIn = getCookie(AxiosConstant.token)?true: false;
            return localData;
         });

    useEffect(() => {
        localStorage.setItem("navbar", JSON.stringify(navbar))
    }, [navbar]);

    const toggleNavbar = (isOpen) => {
        setNavbar({
            ...navbar,
            isNavOpen: isOpen
        });
    }

    const setUserLogIn = (isLogin, userName) => {
        setNavbar({
            ...navbar,
            isUserLoggedIn: isLogin,
            userName: userName
        });
    }

    const logoutUser = () => {
        deleteCookie(AxiosConstant.token);
        setNavbar({
            ...navbar,
            isUserLoggedIn: false,
            userName: ''
        });
        console.log('cookie deleted');
        toast.success(`${navbar.userName}, you are successfully logged out. We are looking back to host you!!!!}`);
    }

     return ( 
        <NavbarContext.Provider value={{navbar, toggleNavbar, setUserLogIn, logoutUser}}>
            {props.children}
        </NavbarContext.Provider>
     )
}

export default NavbarContextProvider;
import React from 'react';
import HorizontalNavbar from './components/layout/HorizontalNavbar';
import SideNavbar from './components/layout/SideNavbar';
import BodyContent from './components/layout/BodyContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import NavbarContextProvider from './context/NavbarContext';
import {BrowserRouter} from 'react-router-dom';
import {LinearProgress} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
    <div id='gloabal-api-loader'> 
              {/* <CircularProgress   variant="indeterminate"  disableShrink  className='loader-global'/> */}
              <LinearProgress className='linear-loader-global' />
      </div>
      <div className={classes.root} id='app-body'>
        <NavbarContextProvider>
          <BrowserRouter>
            <CssBaseline />
            <HorizontalNavbar />
            <SideNavbar />
            <BodyContent />
          </BrowserRouter>
        </NavbarContextProvider>
      </div>
    </div>
  );
}

export default App;

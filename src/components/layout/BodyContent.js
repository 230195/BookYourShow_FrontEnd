import React, {useContext} from 'react';
import {NavbarContext} from '../../context/NavbarContext';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import RouteHelper from '../../helperMethods/RouteHelper';


const useStyles = makeStyles((theme) => ({
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
  }));

const BodyContent = () => {
    const classes = useStyles();
    const {navbar} = useContext(NavbarContext);
    const {isNavOpen} = navbar; 
    const dom = (
        <div >
            <RouteHelper />
        </div>
    )

    return (  
        <main
            className={clsx(classes.content, {
            [classes.contentShift]: isNavOpen,
            })} 
            style={{paddingTop:'0px'}}>
            <div className={classes.drawerHeader} />
            {dom}
        </main> 
    );
}
 
export default BodyContent;
import React, {useContext} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Movie, HighQuality, ChevronRight as ChevronRightIcon, ChevronLeft as ChevronLeftIcon} from '@material-ui/icons';
import {NavbarContext} from '../../context/NavbarContext';

export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const SideNavbar = () => {
    
    const classes = useStyles();
    const theme = useTheme();
    const {navbar, toggleNavbar} = useContext(NavbarContext);
    const {isNavOpen, isUserLoggedIn} = navbar; 
    const handleDrawerClose = () => {
      toggleNavbar(false);
    };

    if(!isUserLoggedIn) 
      return (null)

    return (
      <Drawer 
        variant="permanent"
        
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isNavOpen,
          [classes.drawerClose]: !isNavOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: isNavOpen,
            [classes.drawerClose]: !isNavOpen,
          }),
        }}
      >
        
        
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>

            <Divider />
        <List>
          <Link to='/movie/add'>
            <ListItem button>
              <ListItemIcon>
                <Movie / >
              </ListItemIcon>
              <ListItemText primary='Add Movie' />
            </ListItem>
          </Link>
          <Link to='/'>
            <ListItem button>
              <ListItemIcon>
                <HighQuality / >
              </ListItemIcon>
              <ListItemText primary='New Movies' />
            </ListItem>
          </Link>
        </List>
        
        <Divider />
        <List>
        <Link to='/'>
            <ListItem button>
              <ListItemIcon>
                <HighQuality / >
              </ListItemIcon>
              <ListItemText primary='New Movies' />
            </ListItem>
          </Link>
        </List>
        </div>
      </Drawer>
    );
}

export default SideNavbar;

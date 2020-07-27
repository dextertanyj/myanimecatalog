import {
  AppBar,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Role } from '../gql/documents';
import { useLoggedInQuery } from '../gql/queries';
import { withAuth } from '../HOC/withAuth';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    grid: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    button: {
      marginRight: '10px',
      color: grey[100],
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  })
);

const Navigation = (props: any) => {
  const classes = useStyles();
  const history = useHistory();

  const { data: AuthData } = useLoggedInQuery({
    fetchPolicy: 'cache-and-network',
  });

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Grid container spacing={0}>
          <Grid item>
            <Toolbar>
              <Typography variant="h5" style={{ fontWeight: 375 }}>
                My Anime Manager
              </Typography>
            </Toolbar>
          </Grid>
          <Grid item xs />
          <Grid item className={classes.grid}>
            <IconButton
              onClick={() => history.push('/profile')}
              className={classes.button}
            >
              <AccountCircleOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item className={classes.grid}>
            <IconButton
              onClick={() => history.push('/logout')}
              className={classes.button}
            >
              <ExitToAppOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </AppBar>
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button key={'/'} onClick={() => history.push('/')}>
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItem>
          <ListItem
            button
            key={'manage'}
            onClick={() => history.push('/manage')}
          >
            <ListItemIcon>
              <LibraryBooksOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Manage'} />
          </ListItem>
          <ListItem
            button
            key={'search'}
            onClick={() => history.push('/search')}
          >
            <ListItemIcon>
              <SearchOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Search'} />
          </ListItem>
          {AuthData?.loggedIn?.role === Role.Admin && (
            <ListItem
              button
              key={'users'}
              onClick={() => history.push('/users')}
            >
              <ListItemIcon>
                <PermIdentityOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={'Users'} />
            </ListItem>
          )}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
};

export default (props: any) => withAuth()(Navigation)(props);

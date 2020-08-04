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
  Typography
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Role } from '../gql/documents';
import { useLoggedInQuery } from '../gql/queries';
import { withAuth } from '../HOC/withAuth';

const drawerWidth = 220;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      flexShrink: 0,
      whiteSpace: 'nowrap',
      overflowX: 'hidden',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      width: theme.spacing(7),
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    drawerPaper: {
      justifyContent: 'space-between',
      top: '64px',
      height: 'calc(100% - 64px)',
      overflowX: 'hidden',
    },
    drawerPaperMobile: {
      justifyContent: 'space-between',
      overflowX: 'hidden',
    },
    drawerPaperOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      width: theme.spacing(7),
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
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
    contentWrapper: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    mobileMenuToggle: {
      paddingRight: 0,
      marginRight: -4,
      color: grey[100],
    },
  })
);

const Navigation = (props: any) => {
  const classes = useStyles();
  const history = useHistory();
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(window.innerWidth > 1366);
  const [minHeight, setMinHeight] = useState<number>(window.innerWidth > 600 ? window.innerHeight - 112 : window.innerHeight - 104)

  const { data: AuthData } = useLoggedInQuery({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
      setMinHeight(window.innerWidth > 600 ? window.innerHeight - 112 : window.innerHeight - 104);
      setExpanded(window.innerWidth >= 1366);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Grid container spacing={0}>
          {innerWidth < 960 && (
            <Grid item className={classes.grid}>
              <IconButton
                onClick={() => setMobileOpen(true)}
                className={classes.mobileMenuToggle}
              >
                <MenuOutlinedIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item>
            <Toolbar>
              <Typography variant="h3" style={{ fontSize: '1.5em' }}>
                MyAnimeCatalog
              </Typography>
            </Toolbar>
          </Grid>
          {innerWidth >= 960 && (
            <>
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
            </>
          )}
        </Grid>
      </AppBar>
      <Drawer
        variant={innerWidth >= 960 ? 'permanent' : 'temporary'}
        open={innerWidth >= 960 || mobileOpen}
        onClose={() => setMobileOpen(false)}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: expanded,
          [classes.drawerClose]: !expanded,
        })}
        classes={{
          paper: clsx({
            [classes.drawerPaper]: innerWidth >= 960,
            [classes.drawerPaperMobile]: innerWidth < 960,
            [classes.drawerPaperOpen]: expanded,
            [classes.drawerPaperClose]: !expanded,
          }),
        }}
        anchor="left"
      >
        <List>
          <ListItem
            button
            key={'/'}
            onClick={() => {
              history.push('/');
              setMobileOpen(false);
            }}
          >
            <ListItemIcon>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItem>
          <ListItem
            button
            key={'catalog'}
            onClick={() => {
              history.push('/catalog');
              setMobileOpen(false);
            }}
          >
            <ListItemIcon>
              <LibraryBooksOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'View Catalog'} />
          </ListItem>
          <ListItem
            button
            key={'search'}
            onClick={() => {
              history.push('/search');
              setMobileOpen(false);
            }}
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
              onClick={() => {
                history.push('/users');
                setMobileOpen(false);
              }}
            >
              <ListItemIcon>
                <PermIdentityOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={'Users'} />
            </ListItem>
          )}
          {innerWidth < 960 && (
            <>
              <Divider />
              <ListItem
                button
                key={'profileMobile'}
                onClick={() => {
                  history.push('/profile');
                  setMobileOpen(false);
                }}
              >
                <ListItemIcon>
                  <AccountCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={'Profile'} />
              </ListItem>
              <ListItem
                button
                key={'logoutMobile'}
                onClick={() => {
                  history.push('/logout');
                  setMobileOpen(false);
                }}
              >
                <ListItemIcon>
                  <ExitToAppOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={'Logout'} />
              </ListItem>
            </>
          )}
        </List>
        <ListItem
          button
          style={{
            position: 'sticky',
            width: drawerWidth,
            bottom: 0,
            backgroundColor: grey[100],
            borderTopColor: grey[400],
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <ListItemIcon>
            {expanded ? (
              <ChevronLeftOutlinedIcon />
            ) : (
                <ChevronRightOutlinedIcon />
              )}
          </ListItemIcon>
          <ListItemText
            primary={'Collapse Sidebar'}
            primaryTypographyProps={{ color: 'textSecondary' }}
          />
        </ListItem>
      </Drawer>
      <div className={classes.contentWrapper}>
        <div className={classes.toolbar} />
        <main className={classes.content} style={{ minHeight: minHeight }}>
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default (props: any) => withAuth()(Navigation)(props);

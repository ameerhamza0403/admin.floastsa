/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  button2: {
    color: colors.blueGrey[800],
    padding: '10px 18px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  iconExpand: {
    position: 'absolute',
    right: '0px'
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { pages, className, ...rest } = props;
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      {pages.map(page => {
        return page.child ? (
          <React.Fragment>
            <ListItem
              className={classes.item}
              disableGutters
              key={page.title}
              button>
              <Button
                activeClassName={classes.active}
                className={classes.button}
                component={CustomRouterLink}
                to={page.child[0].href}
                onClick={() => setOpen(!open)}
                style={{
                  margin: 'auto'
                }}>
                <div className={classes.icon}>{page.icon}</div>
                {page.title}
                {open ? (
                  <ExpandLess className={classes.iconExpand} />
                ) : (
                  <ExpandMore className={classes.iconExpand} />
                )}
              </Button>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {page.child.map(e => (
                <React.Fragment>
                  <Button
                    activeClassName={classes.active}
                    className={classes.button2}
                    component={CustomRouterLink}
                    to={e.href}
                    style={{
                      margin: 'auto'
                    }}>
                    <div className={classes.icon}>{e.icon}</div>
                    {e.title}
                  </Button>
                </React.Fragment>
              ))}
            </Collapse>
          </React.Fragment>
        ) : (
          <ListItem className={classes.item} disableGutters key={page.title}>
            {/* <ListItemIcon>
              <div className={classes.icon}>{page.icon}</div>
            </ListItemIcon>
            <ListItemText primary={page.title} /> */}
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              to={page.href}
              style={{
                margin: 'auto'
              }}>
              <div className={classes.icon}>{page.icon}</div>
              {page.title}
            </Button>
          </ListItem>
        );
      })}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;

import React from 'react';
import {
    ListItem,
    ListItemText,
    IconButton,
    Drawer,
    Divider,
    List,
    ListItemIcon
} from '@material-ui/core'
import {withRouter} from 'react-router'
import {DefaultStyles} from './styles'
import {withStyles} from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Home, Language} from '@material-ui/icons';
import compose from 'recompose/compose';

const DrawerList = (props) => {
    const {
        classes,
        categoryList,
        anchor,
        open,
        theme,
        handleDrawerClose
    } = props;
    return (<Drawer variant="persistent" anchor={anchor} open={open} classes={{
            paper: classes.drawerPaper
        }}>
        <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
                {
                    theme.direction === 'rtl'
                        ? <ChevronRightIcon/>
                        : <ChevronLeftIcon/>
                }
            </IconButton>
        </div>
        <List>
            <div>
                <a href='/'>
                    <ListItem >
                        <ListItemIcon>
                            <Home/>
                        </ListItemIcon>
                        <ListItemText primary="All"/>
                    </ListItem>
                </a>
                {
                    categoryList && Object.keys(categoryList).map((name) => (<a key={name} href={'/' + name}>
                        <ListItem>
                            <ListItemIcon>
                                <Language/>
                            </ListItemIcon>
                            <ListItemText primary={name.toUpperCase()}/>
                        </ListItem>
                    </a>))
                }
            </div>
        </List>
        <Divider/>
    </Drawer>);
}

export default compose(withRouter, withStyles(DefaultStyles, {withTheme: true}))(DrawerList);

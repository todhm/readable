import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {getCategories} from '../default/action';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import compose from 'recompose/compose';
import {IconButton,Toolbar,Typography, AppBar,
	Button,Paper,List,Grid,TextField, } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import {DefaultStyles} from '../utils/styles'
import DrawerList from '../utils/Drawer'
import { withStyles } from '@material-ui/core/styles';

class DefaultHeader extends React.Component {

	static contextTypes = {
           router: PropTypes.object
         }

	 state = {
		    open: false,
		    anchor: 'left',
	  	};

	  handleDrawerOpen = () => {
	    this.setState({ open: true });
	  };

	  handleDrawerClose = () => {
	    this.setState({ open: false });
	  };


	componentDidMount() {
		this.props.getCategory()

	}


	render() {
		const { classes, theme,categoryList } = this.props;
	    const { anchor, open } = this.state;


		return (
	<Grid container >
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
            	Redable App
              </Typography>
            </Toolbar>
          </AppBar>
		  {<DrawerList
			   categoryList={categoryList}
			    open={open}
				 anchor={anchor}
				 handleDrawerClose={this.handleDrawerClose}/>}
		  <main
		 className={classNames(classes.content, classes['content-left'], {
		   [classes.contentShift]: open,
		   [classes['contentShift-left']]: open,
		 })}
	   >
		 <div className={classes.drawerHeader} />
	   </main>
        </div>
		</Grid>
		);
	}
}
const mapStateToProps = ({DataCenterReducer}) => {
	return {
		...DataCenterReducer,
	}
}

const mapDispatchToProps = (dispatch)=>{
    return {
        getCategory:()=>dispatch(getCategories()),

    }
}

export default compose(
	connect(mapStateToProps,mapDispatchToProps),
	withRouter,withStyles(DefaultStyles,{ withTheme: true }))(DefaultHeader);

import React from 'react'
import {Typography, Button, Paper, List, Grid} from '@material-ui/core'
import Backspace from '@material-ui/icons/Backspace';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import {DefaultStyles} from './styles'

const NotFound = (props) => {
    const classes = props.classes;
    return (<Grid container="container">
        <Grid item="item" xs={2} sm={2}/>
        <Grid item="item" xs={8} sm={8}>
            <Paper>
                <Typography className={classes.bigFont}>Not Found Sorry</Typography>
                <Link to='/'>
                    <Backspace/>
                    Go Back</Link>
            </Paper>
        </Grid>
        <Grid item="item" xs={2} sm={2}/>
    </Grid>)
}

export default withStyles(DefaultStyles)(NotFound)

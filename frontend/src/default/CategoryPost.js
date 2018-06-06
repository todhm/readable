import React, { Component,Fragment } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import {addDispatchPost,updateCategorySort} from '../default/action';
import {DefaultStyles} from '../utils/styles'
import PostList from './PostList';
import PostModal from './PostModal'
import {Paper,Button,Typography,Select,
    FormControl,MenuItem,InputLabel} from  '@material-ui/core';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core/List";
import uuid from 'uuid';
import serializeForm from 'form-serialize'


class CategoryPost extends Component {
    static contextTypes = {
           router: PropTypes.object
         }

     state = {
         showModal:false,
     }

     handleModalClose=(e)=>{
         this.setState({showModal:false})
     }

     handleSort=(e)=>{
         const {categoryObj} = this.props;
         const category = categoryObj.name;
         this.props.updateCategorySort(e.target.value,category);
     }

    handleChange = name => ({ target: { value } }) => {
        this.setState({
          [name]: value
        });
    };

     handlePostAdd=(e)=>{
         this.setState({showModal:true})
     }

     submitForm=(e)=>{
        e.preventDefault()
        const values = serializeForm(e.target, { hash: true })
        const{author,title,body} = values;
        const {categoryObj} = this.props;
        const category = categoryObj.name;
        if(!(author&&title&&body)){
            alert("Please fill out the Form!")
            return ;
        }
        const data = {id:uuid(),timestamp:Date.now(),author,title,body,category};
        this.props.addPost(data);
        this.setState({
            showModal:false,
        })
    }



    render() {
      const { classes,categoryObj,postList} = this.props;
      const {showModal} = this.state
      return (
          <Fragment>
            <Paper className={classes.root} >
                <Typography variant="headline" component="h3">
                  <Link key={categoryObj.name} to={'/'+categoryObj.name}>{categoryObj.name.toUpperCase()}</Link>
                  <Button onClick={this.handlePostAdd}>
                      <AddCircleOutline/>
                  </Button>
                </Typography>
                <FormControl className={classes.formControl}>
                   <InputLabel htmlFor="controlled-open-select">Sort</InputLabel>
                   <Select value={categoryObj.sortMethod} onChange={this.handleSort}>
                     <MenuItem value="">
                       <em>None</em>
                     </MenuItem>
                     <MenuItem key="timestamp" value="timestamp">timestamp</MenuItem>
                     <MenuItem key="voteScore" value="voteScore">voteScore</MenuItem>
                   </Select>
                 </FormControl>
                  <PostList
                       postList={postList}
                       style={classes.root}
                       sortMethod={categoryObj.sortMethod}
                       />
              </Paper>
                  <PostModal
                      open={showModal}
                      handleClose={this.handleModalClose}
                      style={classes.dialog}
                      submitForm={this.submitForm}
                      handleChange={this.handleChange}
                      />
              </Fragment>
        );
      }
    }

const mapDispatchToProps = (dispatch)=>{
    return {
        updateCategorySort:(data,category)=>dispatch(updateCategorySort(data,category)),
        addPost:(data)=>dispatch(addDispatchPost(data))
    }
}


export default compose(
    withStyles(DefaultStyles),
    connect(null,mapDispatchToProps),
    )
    (CategoryPost);

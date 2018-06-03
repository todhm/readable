import React, { Component,Fragment } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import compose from 'recompose/compose';
import * as postAction from './action'
import classnames from 'classnames';
import {ExpandMoreIcon,ShareIcon,ThumbUp,ThumbDown,FavoriteIcon,Edit,Delete,AddCircleOutline} from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import {timeConverter} from '../utils/timeutil'
import PostModal from '../default/PostModal'
import CardForm from './CardForm'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import {Grid,Button,Tooltip,Paper,Typography} from '@material-ui/core'
import serializeForm from 'form-serialize'
import {DefaultStyles} from '../utils/styles'
import uuid from 'uuid'

class Post extends Component {
    static contextTypes = {
           router: PropTypes.object
         }

    state = {
        postList:[],
        showModal:false,
        postId:"",
        addComment:false,
    }


     componentDidMount(){
         const pathList = this.context.router.history.location.pathname.split("/",-1);
         const postId =  pathList[pathList.length-1];
         this.setState({postId})
         this.props.getPost(postId)
         this.props.getComments(postId)
     }

     handleThumbUp=(e)=>{
         const postId = this.props.id;
         let params = {};
         params['option'] = 'upVote';
         this.props.upVote(postId,params)
     }

     handleThumbDown=(e)=>{
         const postId = this.props.id;
         let params = {};
         params['option'] = 'downVote';
         this.props.downVote(postId,params)
     }


     handleModalOpen=(e)=>{
         this.setState({showModal:true})
     }

     handleModalClose=(e)=>{
         this.setState({showModal:false})
     }

     handleDeletePost=(e)=>{
         const postId = this.state.postId;
         this.props.deletePost(postId);
         window.location='/';

     }

     handleAddComment=(e)=>{
         this.setState((prevState)=>({addComment:!prevState.addComment}))
     }

     submitComment=(e)=>{
         e.preventDefault()
         const values = serializeForm(e.target, { hash: true });
         values['id'] = uuid();
         values['parentId'] = this.state.postId;
         values['timestamp'] = Date.now();
         this.props.addComment(values);
         this.setState({addComment:false})
     }

     submitForm=(e)=>{
         e.preventDefault()
         const values = serializeForm(e.target, { hash: true })
         const{author,title,body} = values;
         if(!(title&&body)){
             alert("Please fill out the Form!")
             return ;
         }
         const postId = this.props.id;
         const data = {title,body};
         this.props.editPost(postId,data);
         this.setState({
             showModal:false,
         })
     }



      render() {
          const{classes,id,timestamp,title,body,author,category,voteScore,
              deleted,votedUp,votedDown,commentList} = this.props;
          const{showModal, addComment} = this.state;
          const thumbUpColor = votedUp? "blue":"black";
          const thumbDownColor = votedDown? "blue":"black";
          const buttonDisabled = votedUp || votedDown ;
          const timeString = timeConverter(timestamp);
          return (
          <Fragment>
              <Grid container spacing={16}>
              <Grid item  sm={1} xs={1}/>
                <Grid item={true} sm={10} xs={10} >
                    <CardForm
                        handleThumbUp={this.handleThumbUp}
                        handleThumbDown={this.handleThumbDown}
                        handleEdit={this.handleModalOpen}
                        handleDeletePost={this.handleDeletePost}
                        thumbUpColor={thumbUpColor}
                        thumbDownColor={thumbDownColor}
                        title={title}
                        timeString={timeString}
                        body={body}
                        author={author}
                        voteScore={voteScore}
                        buttonDisabled={buttonDisabled}
                        isPost={true}
                        />
                  </Grid>
                  <Grid item sm={1} xs={1}/>
              </Grid>
              <Grid container spacing={16}>
                  <Grid item  sm={1} xs={1}/>
                  <Grid item  sm={10} xs={10}>
                      <Paper className={classes.root} >
                          <Typography variant="headline" component="h3">
                            Comment List
                            <Button onClick={this.handleAddComment}>
                                <AddCircleOutline/>
                            </Button>
                          </Typography>
                        </Paper>
                  </Grid>
                  <Grid item  sm={1} xs={1}/>
              </Grid>
              <Grid container spacing={16}>
                  <Grid item  sm={1} xs={1}/>
                  <Grid item  sm={10} xs={10}>
                      {commentList?
                      commentList.map(comment=>
                      <CommentList
                          comment={comment}
                          />)
                      :null}
                  </Grid>
                  <Grid item  sm={1} xs={1}/>
              </Grid>
              <Grid container spacing={16}>
                  <Grid item  sm={1} xs={1}/>
                  <Grid item  sm={10} xs={10}>
                      {addComment?
                          <CommentForm formName="Add Post"
                                handleCommentForm={this.handleAddComment}
                                handleSubmit={this.submitComment}
                                isAdd={true}
                                />
                          :null}
                  </Grid>
                  <Grid item  sm={1} xs={1}/>
              </Grid>
                  <PostModal
                      open={showModal}
                      handleClose={this.handleModalClose}
                      style={classes.dialog}
                      submitForm={this.submitForm}
                      author={author}
                      title={title}
                      body={body}
                      />
              </Fragment>


        );
      }
    }

const mapStateToProps=({PostReducer})=>{
    return {
        ...PostReducer
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        getPost:(postId)=>dispatch(postAction.getPost(postId)),
        upVote:(postId,data)=>dispatch(postAction.addVote(postId,data)),
        downVote:(postId,data)=>dispatch(postAction.downVote(postId,data)),
        editPost:(postId,data)=>dispatch(postAction.editPost(postId,data)),
        deletePost:(postId)=>dispatch(postAction.deletePost(postId)),
        getComments:(postId)=>dispatch(postAction.getComments(postId)),
        addComment:(data)=>dispatch(postAction.addComment(data)),



    }
}

export default compose(
    withStyles(DefaultStyles),
    connect(mapStateToProps,mapDispatchToProps),
    )(Post);

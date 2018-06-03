import React,{Fragment,Component} from 'react'
import {Grid,Tooltip,Button,Card,
        MenuList,ListItemText,Typography} from  '@material-ui/core';
import {connect } from 'react-redux'
import {ThumbUp,ThumbDown} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {upVote,downVote,getComments} from './action'
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';

const styles = theme => ({
  typography: {
    marginTop:10 ,
    fontSize:4
  },
});

class LittlePost extends Component {

     state = {
         buttonDisabled:false,
     }

     handleThumbUp=(e)=>{
         const postId = this.props.postId;
         let params = {};
         params['option'] = 'upVote';
         this.props.upVote(postId,params)
         this.setState({buttonDisabled:true})
     }

     handleThumbDown=(e)=>{
         const postId = this.props.postId;
         let params = {};
         params['option'] = 'downVote';
         this.props.downVote(postId,params)
         this.setState({buttonDisabled:true})
     }

     componentDidMount(){
         const postId=this.props;
         this.props.getComments(postId);


     }





      render() {
          const {title,postId,voteScore,voteUp,voteDown,classes,commentList} = this.props;
          const {buttonDisabled} = this.state
          console.log(voteUp)
          const thumbUpColor= voteUp? "blue":"black";
          const thumbDownColor=voteDown?'blue':'black';
          const commentCount = commentList? commentList.length:0;
          return (
              <Card>
                <Grid container>
                  <Link to={'/post/' +postId}>
                      <ListItemText inset primary={title} />
                  </Link>
                </Grid>
                <Grid container>
                  <Grid item  sm={3}>
                      <Tooltip title="VoteUp">
                          <Button disabled={buttonDisabled} onClick={this.handleThumbUp}>
                              <ThumbUp nativeColor={thumbUpColor}/>
                          </Button>
                      </Tooltip>
                    </Grid>
                    <Grid item sm={3}>
                          <Tooltip title="VoteDown">
                              <Button disabled={buttonDisabled} onClick={this.handleThumbDown}>
                                  <ThumbDown nativeColor={thumbDownColor} / >
                              </Button>
                          </Tooltip>
                      </Grid>
                      <Grid item sm={3} className={classes.typography}>
                          <Typography >
                            VoteScore: {voteScore}
                          </Typography>
                      </Grid>
                      <Grid item sm={3} className={classes.typography}>
                          <Typography >
                            Comments: {commentCount}
                          </Typography>
                      </Grid>
                  </Grid>
              </Card>
        )
      }
    }


const mapDispatchToProps = (dispatch)=>{
        return {
            upVote:(postId,body)=>dispatch(upVote(postId,body)),
            downVote:(postId,body)=>dispatch(downVote(postId,body)),
            getComments:(postId)=>dispatch(getComments(postId)),


        }
    }

    export default compose(
        withStyles(styles),
        connect(null,mapDispatchToProps),
        )
        (LittlePost);

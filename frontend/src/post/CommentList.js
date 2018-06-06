import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import compose from 'recompose/compose';
import * as postAction from './action'
import classnames from 'classnames';
import red from '@material-ui/core/colors/red';
import {
    ExpandMoreIcon,
    ShareIcon,
    ThumbUp,
    ThumbDown,
    FavoriteIcon,
    Edit,
    Delete
} from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {withStyles} from '@material-ui/core/styles';
import CardForm from './CardForm'
import CommentForm from './CommentForm'
import serializeForm from 'form-serialize'
import {timeConverter} from '../utils/timeutil'
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Grid,
    Button,
    Tooltip
} from '@material-ui/core'

class CommentList extends Component {

    state = {
        editComment: false

    }

    handleCommentEdit = (e) => {
        this.setState(prevState => ({
            editComment: !prevState.editComment
        }))
    }

    handleDeleteComment = (e) => {
        const commentId = this.props.comment.id;
        this.props.deleteComment(commentId);

    }

    submitForm = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, {hash: true})
        if (!(values.body)) {
            alert("Please fill out the Form!")
            return;
        }
        values['timestamp'] = Date.now();
        this.props.editComment(this.props.comment.id, values);
        this.setState({editComment: false})
    }

    handleThumbUp = (e) => {
        let data = {};
        data['option'] = 'upVote';
        this.props.editCommentVote(this.props.comment.id, data, 'votedUp')
    }

    handleThumbDown = (e) => {
        let data = {};
        data['option'] = 'downVote';
        this.props.editCommentVote(this.props.comment.id, data, 'votedDown')
    }

    render() {
        const {comment} = this.props;
        const {editComment} = this.state;
        const votedUp = comment.votedUp;
        const votedDown = comment.votedDown;
        const thumbUpColor = votedUp
            ? "blue"
            : "black";
        const thumbDownColor = votedDown
            ? "blue"
            : "black";
        const buttonDisabled = votedUp || votedDown;
        const timeString = timeConverter(comment.timestamp);

        return (<Fragment>
            {
                (editComment)
                    ? <CommentForm formName="Edit Post" body={comment.body} author={comment.author} isAdd={false} handleSubmit={this.submitForm} handleCommentForm={this.handleCommentEdit}/>
                    : <CardForm handleThumbUp={this.handleThumbUp} handleThumbDown={this.handleThumbDown} handleEdit={this.handleCommentEdit} handleDeletePost={this.handleDeleteComment} thumbUpColor={thumbUpColor} thumbDownColor={thumbDownColor} timeString={timeString} body={comment.body} author={comment.author} voteScore={comment.voteScore} buttonDisabled={buttonDisabled} isPost={false}/>
            }
        </Fragment>);
    }
}

const mapStateToProps = ({PostReducer}) => {
    return {
        ...PostReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editComment: (commentId, data) => dispatch(postAction.editComment(commentId, data)),
        editCommentVote: (commentId, data, vote) => dispatch(postAction.editCommentVote(commentId, data, vote)),
        deleteComment: (commentId) => dispatch(postAction.deleteComment(commentId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);

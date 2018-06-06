import React, {Fragment, Component} from 'react'
import {
    Grid,
    Tooltip,
    Button,
    Card,
    MenuList,
    ListItemText,
    Typography
} from '@material-ui/core';
import {connect} from 'react-redux'
import {ThumbUp, ThumbDown, Delete, Edit} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import {upVote, downVote, getComments, editPost, deletePost} from './action'
import {withStyles} from '@material-ui/core/styles';
import compose from 'recompose/compose';
import {DefaultStyles} from '../utils/styles'
import PostModal from './PostModal'
import serializeForm from 'form-serialize'

class LittlePost extends Component {

    state = {
        buttonDisabled: false,
        showModal: false
    }

    handleThumbUp = (e) => {
        const postId = this.props.postId;
        let params = {};
        params['option'] = 'upVote';
        this.props.upVote(postId, params)
        this.setState({buttonDisabled: true})
    }

    handleThumbDown = (e) => {
        const postId = this.props.postId;
        let params = {};
        params['option'] = 'downVote';
        this.props.downVote(postId, params)
        this.setState({buttonDisabled: true})
    }

    handleModal = (e) => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }))
    }

    submitForm = (e) => {
        e.preventDefault()
        const values = serializeForm(e.target, {hash: true})
        const {author, title, body} = values;
        if (!(title && body)) {
            alert("Please fill out the Form!")
            return;
        }
        const postId = this.props.postId;
        const data = {
            title,
            body
        };
        this.props.editPost(postId, data);
        this.setState({showModal: false})
    }

    handleDeletePost = (e) => {
        const postId = this.props.postId;
        this.props.deletePost(postId);

    }

    componentDidMount() {
        const postId = this.props;
        this.props.getComments(postId);

    }

    render() {
        const {
            title,
            postId,
            voteScore,
            voteUp,
            voteDown,
            classes,
            commentList,
            author,
            body,
            category
        } = this.props;
        const {buttonDisabled, showModal} = this.state
        const thumbUpColor = voteUp
            ? "blue"
            : "black";
        const thumbDownColor = voteDown
            ? 'blue'
            : 'black';
        const commentCount = commentList
            ? commentList.length
            : 0;
        return (<Fragment>
            <Card>
                <Grid container="container">
                    <Grid item="item" sm={6}>
                        <ListItemText inset="inset" primary={author}/>
                    </Grid>
                    <Grid item="item" sm={3}>
                        <Tooltip title="VoteUp">
                            <Button disabled={buttonDisabled} onClick={this.handleThumbUp}>
                                <ThumbUp nativeColor={thumbUpColor}/>
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item="item" sm={3}>
                        <Tooltip title="VoteDown">
                            <Button disabled={buttonDisabled} onClick={this.handleThumbDown}>
                                <ThumbDown nativeColor={thumbDownColor}/></Button>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Grid container="container">
                    <Link to={'/' + category + '/' + postId}>
                        <ListItemText inset="inset" primary={title}/>
                    </Link>
                </Grid>
                <Grid container="container">
                    <Grid item="item" sm={3}>
                        <Typography className={classes.typography}>
                            VoteScore: {voteScore}
                        </Typography>
                    </Grid>
                    <Grid item="item" sm={3}>
                        <Typography className={classes.typography}>
                            Comments: {commentCount}
                        </Typography>
                    </Grid>
                    <Grid item="item" sm={3}>
                        <Tooltip title="Edit">
                            <Button size="small" onClick={this.handleModal}>
                                <Edit/>
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item="item" sm={3}>
                        <Tooltip title="Delete">
                            <Button size="small" onClick={this.handleDeletePost}>
                                <Delete/>
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Card>
            <PostModal open={showModal} handleClose={this.handleModal} style={classes.dialog} submitForm={this.submitForm} author={author} title={title} body={body}/>
        </Fragment>)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        upVote: (postId, body) => dispatch(upVote(postId, body)),
        downVote: (postId, body) => dispatch(downVote(postId, body)),
        getComments: (postId) => dispatch(getComments(postId)),
        editPost: (postId, body) => dispatch(editPost(postId, body)),
        deletePost: (postId) => dispatch(deletePost(postId))
    }
}

export default compose(withStyles(DefaultStyles), connect(null, mapDispatchToProps),)(LittlePost);

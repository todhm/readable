import * as api from '../utils/api'
import * as postAction from './actionTypes'


export const fetchPost=(data)=>({
    type:postAction.GET_POST,
    data:data
})


export const fetchComments=(data)=>({
    type: postAction.GET_COMMENTS,
    data:data
})


export const fetchNewComment=(data)=>({
    type: postAction.ADD_COMMENTS,
    data:data
})


export const fetchEditComment=(commentId,data)=>({
    type: postAction.EDIT_COMMENT,
    commentId:commentId,
    data:data
})

export const fetchDeleteComment=(commentId,data)=>({
    type: postAction.DELETE_COMMENT,
    commentId:commentId,
    data:data
})


export const editPost=(postId,body)=>dispatch=>(
    api.editData('/posts/'+postId,body).then(response=>{
        dispatch(fetchPost(response.data))
        }
    )
)

export const getPost=(postId)=>dispatch=>(
    api.getData('/posts/'+postId).then(response=>{
        const post = response.data;
        if(!post.id){
            window.location='/notfound';
        }
        dispatch(fetchPost(post))
        }
    )
)


export const deletePost=(postId)=>dispatch=>(
    api.deleteData('/posts/'+postId).then(response=>{
        const post = response.data;
        dispatch(fetchPost(post))
        }
    )
)

export const addVote=(postId,body)=>dispatch=>(
    api.addData('/posts/'+postId,body).then(response=>{
        const postData = response.data;
        postData['votedUp'] = true;
        dispatch(fetchPost(postData))
        }
    )
)

export const downVote=(postId,body)=>dispatch=>(
    api.addData('/posts/'+postId,body).then(response=>{
        const postData = response.data;
        postData['votedDown'] = true;
        dispatch(fetchPost(postData))
        }
    )
)

export const getComments=(postId)=>dispatch=>(
    api.getData('/posts/'+postId+'/comments').then(response=>{
        const comments = response.data;
        dispatch(fetchComments(comments))
        }
    )
)


export const addComment=(body)=>dispatch=>(
    api.addData('/comments',body).then(response=>{
        const comment = response.data;
        dispatch(fetchNewComment(comment))
        }
    )
)

export const editComment=(commentId,body)=>dispatch=>(
    api.editData('/comments/' + commentId,body).then(response=>{
        const comment = response.data;
        dispatch(fetchEditComment(commentId,comment))
        }
    )
)

export const editCommentVote=(commentId,body,vote)=>dispatch=>(
    api.addData('/comments/' + commentId,body).then(response=>{
        const comment = response.data;
        comment[vote] = true;
        dispatch(fetchEditComment(commentId,comment))
        }
    )
)


export const deleteComment=(commentId)=>dispatch=>(
    api.deleteData('/comments/'+commentId).then(response=>{
        const comment = response.data;
        dispatch(fetchDeleteComment(commentId,comment))
        }
    )
)

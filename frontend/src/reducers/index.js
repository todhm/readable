import {combineReducers} from 'redux'
import * as defaultAction from '../default/action'
import * as postAction from '../post/action'
const dataCenter={
    categoryList:{},
    postList:{},

}

export const initialPost ={
    id:"",
    timestamp:0,
    title:"",
    body:"",
    author:"",
    category:"",
    voteScore:1,
    deleted:false,
    votedUp:false,
    votedDown:false,
    commentList:[],
}

export const PostReducer =(state=initialPost,action)=>{
    switch(action.type){
        default:
            return state
        case postAction.GET_POST:
            return {
                ...state,
                ...action.data
            }

        case postAction.GET_COMMENTS:
            return {
                ...state,
                commentList:action.data
            }

        case postAction.ADD_COMMENTS:
            return {
                ...state,
                commentList:[
                    ...state.commentList,
                    action.data
                ]
            }
        case postAction.EDIT_COMMENT:
            return {
                ...state,
                commentList:[
                    ...state.commentList.map((comment,index)=>{
                        if(comment.id !== action.commentId) {
                            return comment;
                        }
                        return {
                            ...action.data
                        };
                    })
                ]
            }

        case postAction.DELETE_COMMENT:
            return {
                ...state,
                commentList:[
                    ...state.commentList.filter((comment)=>
                        comment.id!=action.commentId
                    )
                ]
            }
    }
}

const CommentReducer =(state=initialComment,action)=>{
    switch(action.type){
        default:
            return state

    }
}

export const DataCenterReducer =(state=dataCenter,action)=>{
    switch(action.type){
        default:
            return state

        case defaultAction.GET_CATEGORIES:
            return {
                ...state,
                categoryList:action.categoryList,
            }
        case defaultAction.GET_POSTS:
            return {
                ...state,
                postList:action.postList,
            }


        case defaultAction.ADD_POST:
            return {
                ...state,
                postList:{
                    ...state.postList,
                    [action.payload.id]:{
                        ...action.payload
                    }
                },
            }

        case defaultAction.GET_COMMENTS:
            return {
                ...state,
                postList:{
                    ...state.postList,
                    [action.postId]:{
                        ...state.postList[action.postId],
                        commentList:action.payload,
                    }
                }
            }


        case defaultAction.UPDATE_CATEGORY_SORT:
            return {
                ...state,
                categoryList:{
                    ...state.categoryList,
                    [action.category]:{
                        ...state.categoryList[action.category],
                        sortMethod:action.sortMethod
                    }
                }
            }
    }

}


export default combineReducers({
    DataCenterReducer,
    PostReducer
});

import * as api from '../utils/api'

export const GET_CATEGORIES = "GET_CATEGORIES"
export const UPDATE_CATEGORY_SORT = "UPDATE_CATEGORY_SORT"
export const GET_POSTS = "GET_POSTS"
export const ADD_POST = "ADD_POST"
export const UPDATE_POST="UPDATE_POST"
export const GET_COMMENTS="GET_COMMENTS"

export const updateAllCategories=(data)=>({
    type:GET_CATEGORIES,
    categoryList:data
})

export const updateCategorySort=(data,category)=>({
    type:UPDATE_CATEGORY_SORT,
    sortMethod:data,
    category
})


export const updateAllPosts=(data)=>({
    type:GET_POSTS,
    postList:data
})


export const addPost=(data)=>({
    type:ADD_POST,
    payload:data
})

export const fetchComments=(data,postId)=>({
    type:GET_COMMENTS,
    payload:data,
    postId:postId
})

export const getCategories=()=>dispatch=>(
    api.getData('/categories').then(response=>{
        const tempCategoryList = response.data.categories;
        const categoryList = tempCategoryList.reduce((category,obj)=>{
            category[obj.name] = {...obj};
            category[obj.name]['sortMethod']="";
            return category
        },{})
        dispatch(updateAllCategories(categoryList))
    }
    )
)

export const getPosts=()=>dispatch=>(
    api.getData('/posts').then(response=>{
        const postList = response.data;
        const categoryObj = postList.reduce((post,obj)=>{
            post[obj.id] = {...obj};
            return post
        },{})
        dispatch(updateAllPosts(categoryObj))
    }

    )
)



export const getCategoryPost=(category)=>dispatch=>(
    api.getData('/'+category+'/posts').then(response=>{
        const postList = response.data;
        const postObj = postList.reduce((post,obj)=>{
            post[obj.id] = {...obj};
            return post
        },{})
        dispatch(updateAllPosts(postObj))
    }

    )
)


export const addDispatchPost=(body)=>dispatch=>(
    api.addData('/posts',body).then(response=>{
        dispatch(addPost(response.data))
    })
)

export const upVote=(postId,body)=>dispatch=>(
    api.addData('/posts/'+postId,body).then(response=>{
        const postData = response.data;
        postData['votedUp'] = true;
        dispatch(addPost(postData))
        }
    )
)


export const downVote=(postId,body)=>dispatch=>(
    api.addData('/posts/'+postId,body).then(response=>{
        const postData = response.data;
        postData['votedDown'] = true;
        dispatch(addPost(postData))
        }
    )
)

export const getComments=(postId)=>dispatch=>(
    api.getData('/posts/'+postId+'/comments').then(response=>{
        dispatch(fetchComments(response.data,postId)
        )
    }
    )
)

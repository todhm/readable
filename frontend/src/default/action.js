import * as api from '../utils/api'
import * as defaultAction from './actionTypes';


export const updateAllCategories = (data) => ({
	type: defaultAction.GET_CATEGORIES,
	categoryList: data
})

export const updateCategorySort = (data, category) => ({
	type: defaultAction.UPDATE_CATEGORY_SORT,
	sortMethod: data,
	category
})


export const updateAllPosts = (data) => ({
	type: defaultAction.GET_POSTS,
	postList: data
})


export const addPost = (data) => ({
	type: defaultAction.ADD_POST,
	payload: data
})

export const fetchEditPost = (data) => ({
	type: defaultAction.UPDATE_POST,
	payload: data
})

export const fetchDeletePost = (postId) => ({
	type: defaultAction.DELETE_POST,
	postId: postId,
})


export const fetchComments = (data, postId) => ({
	type: defaultAction.GET_COMMENTS,
	payload: data,
	postId: postId
})

export const getCategories = () => dispatch => (
	api.getData('/categories').then(response => {
		const tempCategoryList = response.data.categories;
		const categoryList = tempCategoryList.reduce((category, obj) => {
			category[obj.name] = { ...obj
			};
			category[obj.name]['sortMethod'] = "";
			return category
		}, {})
		dispatch(updateAllCategories(categoryList))
	})
)

export const getPosts = () => dispatch => (
	api.getData('/posts').then(response => {
			const postList = response.data;
			const categoryObj = postList.reduce((post, obj) => {
				post[obj.id] = { ...obj
				};
				return post
			}, {})
			dispatch(updateAllPosts(categoryObj))
		}

	)
)

export const getCategoryPost = (category) => dispatch => (
	api.getData('/' + category + '/posts').then(response => {
			const postList = response.data;
			const postObj = postList.reduce((post, obj) => {
				post[obj.id] = { ...obj
				};
				return post
			}, {})
			dispatch(updateAllPosts(postObj))
		}

	)
)


export const addDispatchPost = (body) => dispatch => (
	api.addData('/posts', body).then(response => {
		dispatch(addPost(response.data))
	})
)

export const upVote = (postId, body) => dispatch => (
	api.addData('/posts/' + postId, body).then(response => {
		const postData = response.data;
		postData['votedUp'] = true;
		dispatch(addPost(postData))
	})
)


export const downVote = (postId, body) => dispatch => (
	api.addData('/posts/' + postId, body).then(response => {
		const postData = response.data;
		postData['votedDown'] = true;
		dispatch(addPost(postData))
	})
)

export const getComments = (postId) => dispatch => (
	api.getData('/posts/' + postId + '/comments').then(response => {
		dispatch(fetchComments(response.data, postId))
	})
)

export const editPost = (postId, body) => dispatch => (
	api.editData('/posts/' + postId, body).then(response => {
		dispatch(fetchEditPost(response.data))
	})
)

export const deletePost = (postId) => dispatch => (
	api.deleteData('/posts/' + postId).then(response => {
		const post = response.data;
		dispatch(fetchDeletePost(postId))
	})
)

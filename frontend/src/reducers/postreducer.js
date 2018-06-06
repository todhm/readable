import * as postAction from '../post/actionTypes'

export const initialPost = {
	id: "",
	timestamp: 0,
	title: "",
	body: "",
	author: "",
	category: "",
	voteScore: 1,
	deleted: false,
	votedUp: false,
	votedDown: false,
	commentList: [],
}

const  PostReducer = (state = initialPost, action) => {
	switch (action.type) {
		default: return state
		case postAction.GET_POST:
				return {
				...state,
				...action.data
			}

		case postAction.GET_COMMENTS:
				return {
				...state,
				commentList: action.data
			}

		case postAction.ADD_COMMENTS:
				return {
				...state,
				commentList: [
					...state.commentList,
					action.data
				]
			}
		case postAction.EDIT_COMMENT:
				return {
				...state,
				commentList: [
					...state.commentList.map((comment, index) => {
						if (comment.id !== action.commentId) {
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
				commentList: [
					...state.commentList.filter((comment) =>
						comment.id != action.commentId
					)
				]
			}
	}
}

export default PostReducer;

import * as defaultAction from '../default/actionTypes'


const dataCenter = {
	categoryList: {},
	postList: {},

}


const DataCenterReducer = (state = dataCenter, action) => {
	switch (action.type) {
		default: return state

		case defaultAction.GET_CATEGORIES:
				return {
				...state,
				categoryList: action.categoryList,
			}
		case defaultAction.GET_POSTS:
				return {
				...state,
				postList: action.postList,
			}


		case defaultAction.ADD_POST:
				return {
				...state,
				postList: {
					...state.postList,
					[action.payload.id]: {
						...action.payload
					}
				},
			}

		case defaultAction.GET_COMMENTS:
				return {
				...state,
				postList: {
					...state.postList,
					[action.postId]: {
						...state.postList[action.postId],
						commentList: action.payload,
					}
				}
			}

		case defaultAction.UPDATE_POST:
				return {
				...state,
				postList: {
					...state.postList,
					[action.payload.id]: {
						...action.payload
					}
				},
			}

		case defaultAction.DELETE_POST:
				return Object.assign({}, state, {
				postList: Object.keys(state.postList).reduce((result, id) => id === action.postId ?
					result : { ...result,
						[id]: state.postList[id]
					}, {})
			})


		case defaultAction.UPDATE_CATEGORY_SORT:
				return {
				...state,
				categoryList: {
					...state.categoryList,
					[action.category]: {
						...state.categoryList[action.category],
						sortMethod: action.sortMethod
					}
				}
			}
	}

}

export default DataCenterReducer;

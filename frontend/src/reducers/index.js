import {
	combineReducers
} from 'redux'
import PostReducer from './postreducer'
import DataCenterReducer from './datacenterreducer'

export default combineReducers({
	DataCenterReducer,
	PostReducer
});

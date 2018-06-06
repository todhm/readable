
import  * as postAction from '../action';
import {PostReducer,initialPost} from '../../reducers/postreducer'

export const testPost={
    id:"testpost2",
    timestamp:0,
    title:"",
    body:"",
    author:"",
    category:"",
    voteScore:1,
    deleted:false
}

export const testPostComments=[
    {id:'testcommentid',title:'im fun', author:"Shaq", body:"Orlando Magics"},
]
export const testNewComment={
    id:'testcommentid2',title:'im funniest', author:"Curry", body:"GS"
}
export const testEditComment={
    id:'testcommentid2',title:'im boring', author:"Curry", body:"GS"
}
export const testEditPost={
    id:"testpost2",
    timestamp:0,
    title:"why i start react",
    body:"I like react as much as basketball",
    author:"Lebron James",
    category:"",
    voteScore:1,
    deleted:false
}
const sortMethod= 'timestamp';


describe('post reducer', () => {
  describe('actions', () => {
    it('should create actions', () => {

      const expectedActions =[
        { type: postAction.GET_POST },
        { type: postAction.GET_COMMENTS },
        { type: postAction.ADD_COMMENTS },
        { type: postAction.EDIT_COMMENT },
        { type: postAction.DELETE_COMMENT },

      ];
      const actions = [
          postAction.fetchPost(),
          postAction.fetchComments(),
          postAction.fetchNewComment(),
          postAction.fetchEditComment(),
          postAction.fetchDeleteComment(),

      ];
      expect(actions).toEqual(expectedActions);
    });
  });

  describe('reducer', () => {
    let state = PostReducer(undefined,{})
    it('should get the post well', () => {
        state = PostReducer(state,postAction.fetchPost(testPost))
      expect(state.id).toEqual(testPost.id);
    });

    it('should get comments well', () => {
        state = PostReducer(state,postAction.fetchComments(testPostComments))
      expect(state.commentList[0].id).toEqual(testPostComments[0].id);
      expect(state.commentList[0].author).toEqual(testPostComments[0].author);
      expect(state.commentList[0].body).toEqual(testPostComments[0].body);
    });

    it('should add new comment well', () => {
        state = PostReducer(state,postAction.fetchNewComment(testNewComment))
      expect(state.commentList[1].id).toEqual(testNewComment.id);
      expect(state.commentList[1].author).toEqual(testNewComment.author);
      expect(state.commentList[1].body).toEqual(testNewComment.body);
    });

    it('should edit comment comment well', () => {
        state = PostReducer(state,postAction.fetchEditComment('testcommentid2',testNewComment))
      expect(state.commentList[1].id).toEqual(testEditComment.id);
      expect(state.commentList[1].author).toEqual(testEditComment.author);
      expect(state.commentList[1].body).toEqual(testEditComment.body);
    });


    it('should delete comment comment well', () => {
        state = PostReducer(state,postAction.fetchDeleteComment('testcommentid2',testNewComment))
      expect(state.commentList.length).toEqual(1);
      expect(state.commentList[0].id).toEqual(testPostComments[0].id);
      expect(state.commentList[0].author).toEqual(testPostComments[0].author);
      expect(state.commentList[0].body).toEqual(testPostComments[0].body);
    });

  });
});

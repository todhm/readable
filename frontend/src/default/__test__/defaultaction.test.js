
import  * as defaultAction from '../action';
import DataCenterReducer,{initialPost} from '../../reducers'

const commentList=[
    {id:"test",name:"test"}
]
export const testCategoryList={
    'test':{
        'name':"test",
        'path':'test',
    },
    'test2':{
        'name':"test2",
        'path':'test2',
    },
    'test3':{
        'name':"test3",
        'path':'test3',
    }
};

export const testPostList={
    'testpost':{
        id:"testpost",
        timestamp:0,
        title:"",
        body:"",
        author:"",
        category:"",
        voteScore:1,
        deleted:false,
    }
}

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
const sortMethod= 'timestamp';


describe('data center reducer', () => {
  describe('actions', () => {
    it('should create actions', () => {

      const expectedActions =[
        { type: defaultAction.GET_CATEGORIES },
        { type: defaultAction.UPDATE_CATEGORY_SORT },
        { type: defaultAction.GET_POSTS },
        { type: defaultAction.ADD_POST },
        { type: defaultAction.GET_COMMENTS }
      ];
      const actions = [
          defaultAction.updateAllCategories(),
          defaultAction.updateCategorySort(),
          defaultAction.updateAllPosts(),
          defaultAction.addPost(),
          defaultAction.fetchComments(),

      ];
      expect(actions).toEqual(expectedActions);
    });
  });

  describe('reducer', () => {
    let state = DataCenterReducer(undefined,{})
    it('should add category List actions', () => {
        state = DataCenterReducer(state,defaultAction.updateAllCategories(testCategoryList))
      expect(state.categoryList).toHaveProperty('test',testCategoryList['test']);
    });

    it('should update sort of category list ', () => {
        state = DataCenterReducer(state,defaultAction.updateCategorySort('timestamp','test'))
      expect(state.categoryList['test']).toHaveProperty('sortMethod','timestamp');
    })

    it('should update postList' ,() => {
        state = DataCenterReducer(state,defaultAction.addPost(testPost))
      expect(state.postList).toHaveProperty('testpost2',testPost);
    })

    it('should get all post list ', () => {
        state = DataCenterReducer(state,defaultAction.updateAllPosts(testPostList))
      expect(state.postList).toHaveProperty('testpost',testPostList['testpost']);
    })

    it('should get fetch  all comment list ', () => {
        state = DataCenterReducer(state,defaultAction.getComments(testPostList))
      expect(state.postList['testpost']).toHaveProperty('commentList',testPostList['testpost']['commentList']);
    })
  });
});

import React from 'react';
import { mount } from 'enzyme';
import view from '../view'
import configureMockStore from 'redux-mock-store';
import * as defaultAction from '../action';
import {testCategoryList,testPostList,testPost} from './defaultaction.test.js'

describe('CategoryPost', () => {
  let component = null;
  let buttons = null;
  const mockStore = configureMockStore();

  // 데이터들을 받아올 가짜 스토어 만들기
  let store = mockStore({
    categoryList: testCategoryList,
    postList:testPostList
  });
  let categoryObj={
      name:"test",
      postList:[{id:'test',sortMethod:""}]
    }

  it('renders properly', () => {
    const context = { store };
    component = mount(<view store={store} />);
  });

});

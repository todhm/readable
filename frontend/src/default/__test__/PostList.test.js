import React from 'react';
import renderer from 'react-test-renderer';
import PostList from '../PostList';
import {initialPost} from '../../reducers'
import { shallow } from 'enzyme';

const postList=[initialPost]
const sortMethod=""
const mockedEvent = {
      target: {
        value: 'world'
      }
    };
describe('PostList', () => {
  let component = null;

  it('no problem rendering', () => {

    component = shallow(
        <PostList postList={postList} sortMethod={"timestamp"} />
    );
  });

  it('same with snapshot ', () => {
    expect(component).toMatchSnapshot();
  })


  it('handle arrow correctly', () => {
      const instance  = component.instance()
      instance.handleArrow(mockedEvent);
      expect(instance.state.desc).toBe(true); // value 값이 2인지 확인
  });

});

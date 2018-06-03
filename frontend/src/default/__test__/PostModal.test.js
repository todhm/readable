import React from 'react';
import renderer from 'react-test-renderer';
import PostModal from '../PostModal';
import {initialPost} from '../../reducers'
import { mount } from 'enzyme';

const postList=[initialPost]
const sortMethod=""
const mockedEvent = {
      target: {
        value: 'world'
      }
    };
describe('PostModal', () => {
  let component = null;
  const mockHandleClose = jest.fn();
  const mockSubmitForm = jest.fn();
  const mockHandleChange = jest.fn();
  const testAuthor="Lebron Jame";
  const testTitle="How Could I went to Fianl in 2018";
  const testBody="I worked hard";

  it('renders correctly', () => {
    component = mount(
      <PostModal
        open={true}
        handleClose={mockHandleClose}
        submitForm={mockSubmitForm}
        author={testAuthor}
        title={testTitle}
        body={testBody}
        handleChange={mockHandleChange}
        />
    );
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('match text area field', () => {
    expect(component.find('input').at(0).text(), testAuthor);
    expect(component.find('input').at(1).text(), testTitle);
    expect(component.find('textarea').at(0).text(), testBody);
  });

  it('calls functions', () => {
    const buttons = component.find('button');
    buttons.at(0).simulate('click');
    buttons.at(1).simulate('click');

    expect(mockHandleClose.mock.calls.length).toBe(1);
    expect(mockSubmitForm.mock.calls.length).toBe(1);
  });
});

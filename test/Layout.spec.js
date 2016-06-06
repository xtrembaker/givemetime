//jest.unmock('../src/components/Layout');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import configureStore from 'redux-mock-store';
import LoginButton from '../src/components/LoginButton.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import thunk from 'redux-thunk';
import expect, { createSpy } from 'expect';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

import {Layout} from '../src/components/Layout';

function setup(user) {
  let props = {
    user: user
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<Layout {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}


describe("Layout", () => {

    it("render login button when user in not logged in", () => {
      const { output } = setup({})
      expect(output.props.children[1]).toBe('Login to view projects');
    });

    it("render login button when user is logged in", () => {
      const { output } = setup({
        id: 'an id',
        credit: "16"
      })
      expect(output.props.children.length).toBe(4);
    });
});

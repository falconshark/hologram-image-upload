import 'blueimp-canvas-to-blob';
import 'core-js/fn/array/find-index';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Dropzone from './Dropzone';

let store = createStore();

class Holgoram extends React.Component {
  render() {
    <div>
      <Provider store={store}>
        <Dropzone />
      </Provider>
    </div>;
  }
}

export default Holgoram;

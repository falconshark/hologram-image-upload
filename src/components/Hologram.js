/* eslint
react/forbid-prop-types: 'warn',
no-restricted-syntax: 'warn'
*/

import 'blueimp-canvas-to-blob';
import 'core-js/fn/array/find-index';
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Dropzone from './Dropzone';

const store = createStore();

class Holgoram extends React.Component {
  static propTypes = {
    cropperConfig: PropTypes.object,
    dropzoneConfig: PropTypes.object,
    maxFiles: PropTypes.number,
    uploader: PropTypes.string,
    onComplete: PropTypes.func,
    uploadFunction: PropTypes.func,
  };

  static defaultProps = {
    onComplete: () => {},
    uploadFunction: null,
    maxFiles: -1,
    uploader: '',
    cropperConfig: {},
    dropzoneConfig: {
      accept: 'image/*',
      style: {
        width: '100%',
        padding: '2.5em 0',
        background: 'rgba(0,0,0,0.5)',
        textAlign: 'center',
        color: '#fff',
      },
    },
  }

  render() {
    return (
      <div>
        <Provider store={store}>
          <Dropzone />
        </Provider>
      </div>
    );
  }
}

export default Holgoram;

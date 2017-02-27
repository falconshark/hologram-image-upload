import React from 'react';
import ReactDOM from 'react-dom';
import DropzoneCom from './components/Dropzone';

window.hologram = function (element, option) {
  ReactDOM.render(
      <div>
        <h1>Hologram Test</h1>
        <DropzoneCom />
      </div>,
      element
  );
}

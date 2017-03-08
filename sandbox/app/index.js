import React from 'react';
import ReactDOM from 'react-dom';
import Hologram from '../../src/components/Hologram';

window.hologram = function (element, option) {
  ReactDOM.render(
    <div>
      <h1>Hologram Test</h1>
      <Hologram {... option}/>
    </div>,
    element
  );
}

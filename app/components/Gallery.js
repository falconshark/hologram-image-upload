import React from 'react';
import request from 'superagent';

class GalleryCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
  }

  render() {
    return (
      <div>
        {this.state.photos.length > 0 ? <div>
          <h2>Here are {this.state.photos.length} photo:</h2>
          <div>
          </div> : null}
        </div>
      </div>
    );
  }
}

export default GalleryCom

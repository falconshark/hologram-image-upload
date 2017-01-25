import React from 'react';
import Dropzone from 'react-dropzone';

var DropzoneCom = React.createClass({
  getInitialState: function () {
    return {
      files: []
    };
  },

  onDrop: function (acceptedFiles) {
    var images = [];
    acceptedFiles.forEach(function(file){
      file['id'] = Math.random().toString(36).substring(5);
      window.sessionStorage.setItem(file['name'], file);
      images.push(file);
    });

    this.setState({
      files: images
    });
  },

  onOpenClick: function () {
    this.dropzone.open();
  },

  render: function () {
    return (
      <div>
        <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
        <button type="button" onClick={this.onOpenClick}>
          Open Dropzone
        </button>
        {this.state.files.length > 0 ? <div>
          <h2>Uploading {this.state.files.length} files...</h2>
          <div>
            {this.state.files.map((file) => <a href="#" data-toggle="modal" data-target={'#' + file.id}> <img className="dropzone-preview" src={file.preview} /> </a>)}
          </div>
        </div> : null}
      </div>
    );
  }
});

export default DropzoneCom

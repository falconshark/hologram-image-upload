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
      window.sessionStorage.setItem(file['name'], file);
    });

    this.setState({
      files: acceptedFiles
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
            {this.state.files.map((file) => <a href={'#' + file.name}> <img className="dropzone-preview" src={file.preview} /> </a>)}
              {this.state.files.map((file) => <div id={file.name} className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
                  <div className="modal-body">
                    <p>Some text in the modal.</p>
                  </div>
                </div>
              </div>
            </div>
             )}
          </div>
        </div> : null}
      </div>
    );
  }
});

export default DropzoneCom

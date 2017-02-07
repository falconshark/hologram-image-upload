import React from 'react';
import Dropzone from 'react-dropzone';
import CropperCom from "./Cropper";

var DropzoneCom = React.createClass({
  getInitialState: function () {
    return {
      files: []
    };
  },

  onDrop: function (acceptedFiles) {
    var files = [];
    acceptedFiles.forEach(function(file){
      file['key'] = Math.random().toString(36).substring(5);
      files.push(file);
    });

    this.setState({
      files: files
    });
  },

  onUpdate: function(croppedImage){
    var files = this.state.files;
    var fileIndex = files.findIndex((file => file.key === croppedImage.key));
    files[fileIndex].preview = croppedImage.preview;

    this.setState({
      files: files
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
            {this.state.files.map((file) => <a href="#" data-toggle="modal" data-target={'#' + file.key}> <img className="dropzone-preview" src={file.preview} /></a>)}
            {this.state.files.map((file) => <div id={file.key} className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <CropperCom src={file.preview} fileKey={file.key} onUpdate={this.onUpdate}/>
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

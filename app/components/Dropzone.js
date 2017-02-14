import React from 'react';
import Dropzone from 'react-dropzone';
import CropperCom from "./Cropper";
import request from 'superagent';

class DropzoneCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  convert(file){
    return new Promise(function(resolve, reject){
      var image = new Image();
      var canvas = document.createElement('canvas');
      var canvasContext = canvas.getContext('2d');

      image.src = file['preview'];
      image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        canvasContext.drawImage(image, 0, 0, image.width, image.height);

        var dataUrl = canvas.toDataURL();
        file['preview'] = dataUrl;

        var newFile = {
          'name': file['name'],
          'key': file['key'],
          'preview': file['preview'],
          'type': file['type']
        }
        resolve(newFile);
      }
    });
  }

  upload(){
    function _upload(files){
      return new Promise(function(resolve, reject){
        var data = JSON.stringify(files);
        var req = request.post('/upload.php').send(data).end(function(err, res){
          if(err){
            reject(err);
            return;
          }
          resolve(res);
        });
      });
    }

    var files = this.state.files;
    var funList = [];
    for(let file of files){
      funList.push(this.convert(file));
    }

    Promise.all(funList)
    .then(files => _upload(files))
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  }

  onDrop(acceptedFiles) {
    var files = [];
    for(let file of acceptedFiles){
      file['key'] = Math.random().toString(36).substring(5);
      files.push(file);
    }
    this.setState({
      files: files
    });
  }

  onUpdate(updateFile){
    var files = this.state.files;
    var fileIndex = files.findIndex((file => file.key === updateFile.key));
    files[fileIndex] = updateFile;
    this.setState({
      files: files
    });
  }

  onOpenClick() {
    this.dropzone.open();
  }

  render() {
    return (
      <div>
      <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop.bind(this)}>
      <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      <button type="button" onClick={this.onOpenClick.bind(this)}>
      Open Dropzone
      </button>
      {this.state.files.length > 0 ? <div>
        <h2>Uploading {this.state.files.length} files...</h2>
        <div>
        {this.state.files.map((file) => <a href="#" data-toggle="modal" key={file.key} data-target={'#' + file.key}> <img className="dropzone-preview" key={file.key} src={file.preview} /></a>)}
        {this.state.files.map((file) => <div key={file.key} id={file.key} className="modal fade" role="dialog">
        <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-body">
        <CropperCom key={file.key} src={file.preview} file={file} onUpdate={this.onUpdate.bind(this)}/>
        </div>
        </div>
        </div>
        </div>
      )}
      </div>
      <button type="button" className="btn btn-default" onClick={this.upload.bind(this)}>Upload</button>
      </div> : null}
      </div>
    );
  }
}

export default DropzoneCom

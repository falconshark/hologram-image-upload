import React from 'react';
import Dropzone from 'react-dropzone';
import {Button} from 'react-bootstrap';
import ModalCom from "./Modal";
import request from 'superagent';

class Hologram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        };
    }

    //Convert Image to Data URL

    convert(file){
        return new Promise(function(resolve){
            var image = new Image();
            var canvas = document.createElement('canvas');
            var canvasContext = canvas.getContext('2d');

            image.src = file['preview'];
            image.crossOrigin = 'anonymous';
            image.onload = function () {
                canvas.width = image.width;
                canvas.height = image.height;
                canvasContext.drawImage(image, 0, 0, image.width, image.height);

                var dataUrl = canvas.toDataURL();
                file['preview'] = dataUrl;

                var newFile = {
                    'name': file['name'],
                    'key': file['key'],
                    'size': file['size'],
                    'preview': file['preview'],
                    'type': file['type']
                }
                resolve(newFile);
            }
        });
    }

    upload(file){
        var convert = this.convert;
        var uploader = this.props.uploader;
        return new Promise(function(resolve, reject){
            convert(file)
            .then(file =>{
                var data = JSON.stringify(file);
                var req = request.post(uploader).send(data).end(function(err, res){
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve(res);
                });
            });
        });
    }

    //Upload converted file by JSON format to server

    onUpload(){
        var files = this.state.files;
        var funList = [];
        for(let file of files){
            funList.push(this.upload(file));
        }

        Promise.all(funList)
        .then(res => {
            this.props.onComplete(res);
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
                <Button onClick={this.onOpenClick.bind(this)}>Open Dropzone</Button>
                {this.state.files.length > 0 ? <div>
                    <h2>Uploading {this.state.files.length} files...</h2>
                    <div>
                        {this.state.files.map((file) => <div key={file.key}>
                        <ModalCom
                            key={file.key}
                            file={file}
                            cropperConfig={this.props.cropperConfig}
                            cropperUpdate={this.onUpdate.bind(this)}/>
                    </div>
                )}
            </div>
            <Button onClick={this.onUpload.bind(this)}>Upload</Button>
        </div> : null
    }
    </div>
        );
    };

    static propTypes = {
        cropperConfig: React.PropTypes.object,
        uploader: React.PropTypes.string.isRequired,
        onComplete: React.PropTypes.func
    };

    static defaultProps = {
        onComplete: () => {}
    }
}

export default Hologram

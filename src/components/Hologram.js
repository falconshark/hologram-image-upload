import React from 'react';
import Dropzone from 'react-dropzone';
import ModalCom from "./Modal";
import request from 'superagent';

class Hologram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        };
    }

    clear(){
        this.setState({
            files: []
        });
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

    //Upload file to upload hanlder by superagent

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
        var uploadedFile = [];
        for(let file of files){
            funList.push(this.upload(file));
            uploadedFile.push({'key': file['key'], 'name': file['name']});
        }

        Promise.all(funList)
        .then(res => {
            this.props.onComplete({'response': res, 'files': uploadedFile});
        })
        .catch(err => {
            console.log(err);
        });
    }

    onOpenClick() {
        this.dropzone.open();
    }

    onDrop(acceptedFiles) {
        var files = this.state.files;

        for(let acceptedFile of acceptedFiles){
            let file = {
                'name': acceptedFile['name'],
                'key': Math.random().toString(36).substring(1),
                'size': acceptedFile['size'],
                'preview': acceptedFile['preview'],
                'origin': acceptedFile['preview'],
                'type': acceptedFile['type']
            }

            if(files.length < this.props.maxFiles){
                files.push(file);
            }else{
                break;
            }
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

    //Open dropzone without click dropzone

    onOpenClick() {
        this.dropzone.open();
    }

    render() {
        return (
            <div className="dropzone">
                <Dropzone {... this.props.dropzoneConfig} accept={'image/*'}
                    ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop.bind(this)}
                    disableClick={true}>
                    <div>Drop images here to upload them.</div>
                    {this.state.files.length > 0 ?
                        <div className="image-wrapper">
                            <button className="hologram-btn" type="button" onClick={this.onOpenClick.bind(this)}>Open Dropzone</button>
                            <button className="hologram-btn" type="button" onClick={this.onUpload.bind(this)}>Upload</button>
                            <p className="help-block">Click Image to crop it.</p>
                                {this.state.files.map((file) =>
                                    <ModalCom
                                        key={file.key}
                                        file={file}
                                        cropperConfig={this.props.cropperConfig}
                                        cropperUpdate={this.onUpdate.bind(this)}/>
                                )}
                    </div> : <button className="hologram-btn" onClick={this.onOpenClick.bind(this)}>Open Dropzone</button>
                }
            </Dropzone>
        </div>
    );
};

static propTypes = {
    cropperConfig: React.PropTypes.object,
    dropzoneConfig: React.PropTypes.object,
    maxFiles: React.PropTypes.number,
    uploader: React.PropTypes.string.isRequired,
    onComplete: React.PropTypes.func,
};

static defaultProps = {
    onComplete: () => {},
    maxFiles: 10,
    dropzoneConfig : {
        style : {
            width:'100%',
            padding: '2.5em 0',
            background: 'rgba(0,0,0,0.5)',
            textAlign: 'center',
            color: '#fff'
        }
    }
}
}

export default Hologram

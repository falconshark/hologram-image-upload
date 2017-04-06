import React from 'react';
import Dropzone from 'react-dropzone';
import {Panel, Button} from 'react-bootstrap';
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
        for(let file of files){
            funList.push(this.upload(file['file']));
        }

        Promise.all(funList)
        .then(res => {
            this.props.onComplete({'response': res, 'files': files});
        })
        .catch(err => {
            console.log(err);
        });
    }

    onDrop(acceptedFiles) {
        var files = this.state.files;

        for(let acceptedFile of acceptedFiles){
            let file = {
                'name': acceptedFile['name'],
                'key': Math.random().toString(36).substring(1),
                'size': acceptedFile['size'],
                'preview': acceptedFile['preview'],
                'type': acceptedFile['type']
            }

            var originFile = Object.assign({}, file);

            let fileObj = {file: file, originFile: originFile};

            if(files.length < this.props.maxFiles){
                files.push(fileObj);
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
                <Dropzone {... this.props.dropzoneConfig} accept={'image/*'} ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop.bind(this)}>
                    <div>Drop file here to upload them.</div>
                </Dropzone>
                <br></br>
                {this.state.files.length > 0 ? <div>
                    <br></br><br></br>
                    <div>
                        <Panel>
                            <div>
                                {this.state.files.map((file) => <div key={file['file'].key}>
                                <ModalCom
                                    key={file['file'].key}
                                    file={file}
                                    cropperConfig={this.props.cropperConfig}
                                    cropperUpdate={this.onUpdate.bind(this)}/>
                            </div>
                        )}
                    </div>
                </Panel>
            </div>
            <br></br>
            <Button onClick={this.onUpload.bind(this)}>Upload</Button>
            <Button onClick={this.clear.bind(this)}>Clear</Button>

        </div> : null
    }
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
            marginLeft:'auto',
            marginRight:'auto',
            width:'50%',
            padding: '2.5em 0',
            background: 'rgba(0,0,0,0.5)',
            textAlign: 'center',
            color: '#fff'
        }
    }
}
}

export default Hologram

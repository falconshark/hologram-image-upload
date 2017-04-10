import React from 'react';
import ReactCrop from 'react-image-crop';
import {Button, Modal} from 'react-bootstrap';

class CropperCom extends React.Component {
  constructor(props) {
    super(props);
    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.crop = this.crop.bind(this);
    this.state = {
      originImage: {}
    };
  }

  render(){
    return (<div className="text-center">
      <ReactCrop
        {...this.props.config}
        onImageLoaded={this.onImageLoaded}
        onComplete={this.onComplete}
        src={this.props.src}
        />
    <br></br>
      <Button onClick={this.crop}>Save</Button>
    </div>);
  }

  crop(){
    if(this.state.croppedImage){
      this.props.file['preview'] = this.state.croppedImage;
  }else{
      this.props.file['preview'] = this.props.file['origin'];
  }

    this.props.closeModal();
    this.props.onUpdate(this.props.file);
  }

  onImageLoaded(crop, image, pixelCrop){
    this.setState({originImage: image});
  }

  onComplete(crop, pixelCrop) {
    var component = this;
    var originImage = this.state.originImage;
    var imageWidth =  originImage.naturalWidth;
    var imageHeight = originImage.naturalHeight;

    //Use canvas to create a cropped version of image

    if(crop.width || crop.height){
      var cropX = (crop.x / 100) * imageWidth;
      var cropY = (crop.y / 100) * imageHeight;

      var cropWidth = (crop.width / 100) * imageWidth;
      var cropHeight = (crop.height / 100) * imageHeight;

      var canvas = document.createElement('canvas');
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      var ctx = canvas.getContext('2d');

      ctx.drawImage(originImage, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

      canvas.toBlob(function(blob){
        var croppedImage = URL.createObjectURL(blob);
        component.setState({croppedImage: croppedImage});
      }, 'image/jpeg');
    }
  }
}

export default CropperCom

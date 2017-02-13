import React from 'react';
import ReactCrop from 'react-image-crop';

var CropperCom = React.createClass({

  getInitialState: function () {
    return {
      originImage: {}
    };
  },

  render(){
    return (<div>
      <ReactCrop
        onImageLoaded={this.onImageLoaded}
        onComplete={this.onComplete}
        src={this.props.src}
        />
      <button onClick={this.crop} data-dismiss= "modal">Save</button>
    </div>);
  },

  crop: function(){
    this.props.file['preview'] = this.state.croppedImage;
    this.props.onUpdate(this.props.file);
  },

  onImageLoaded: function(crop, image, pixelCrop){
    this.setState({originImage: image});
  },

  onComplete: function (crop, pixelCrop) {
    var originImage = this.state.originImage;
    var imageWidth =  originImage.naturalWidth;
    var imageHeight = originImage.naturalHeight;

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

      var croppedImage = canvas.toDataURL('image/jpeg');

      this.setState({croppedImage: croppedImage});
    }
  }
});

export default CropperCom

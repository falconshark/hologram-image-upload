import React from 'react';
import ReactImageCrop from 'react-image-crop-component';

var CropperCom = React.createClass({
    render(){
        return (<div>
            <ReactImageCrop
              setWidth={300}
              setHeight={300}
              square={true}
              onCrop={this.onCropped}
              onCropData={this.onCroppedData}
              onChange={this.onChanged}
              src={this.props.src}
              />
        </div>);
    },
    onChanged: function (e) {
        console.log(e);
    },
    onCropped: function (e) {
        console.log(e);
    },
    onCroppedData: function (e) {
        console.log(e);
    }
});

export default CropperCom

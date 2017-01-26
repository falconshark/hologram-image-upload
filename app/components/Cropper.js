import React from 'react';
import ReactCrop from 'react-image-crop';

var CropperCom = React.createClass({
    render(){
        return (<div>
            <ReactCrop
              setWidth={300}
              setHeight={300}
              square={true}
              onComplete={this.onComplete}
              src={this.props.src}
              />
        </div>);
    },
    onComplete: function (crop, pixelCrop) {
        console.log('Crop: ', crop);
        console.log('pixelCrop: ', pixelCrop);
    }
});

export default CropperCom

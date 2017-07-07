/* eslint
react/forbid-prop-types: 'warn',
no-restricted-syntax: 'warn'
*/

import React from 'react';
import ReactCrop from 'react-image-crop';
import PropTypes from 'prop-types';

class CropperCom extends React.Component {
  static propTypes = {
    config: PropTypes.object,
    file: PropTypes.object,
    closeModal: PropTypes.func,
    onUpdate: PropTypes.func,
    src: PropTypes.string,
  };

  static defaultProps = {
    config: {},
    file: {},
    closeModal: () => {},
    onUpdate: () => {},
    src: '',
  };

  constructor(props) {
    super(props);
    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.crop = this.crop.bind(this);
    this.state = {
      crop: this.props.config.crop,
      originImage: {},
    };
  }

  onImageLoaded(crop, image) {
    this.setState({ originImage: image });
  }

  onComplete(crop) {
    const component = this;
    const originImage = this.state.originImage;
    this.setState({ crop });
    const imageWidth = originImage.naturalWidth;
    const imageHeight = originImage.naturalHeight;

    // Use canvas to create a cropped version of image

    if (crop.width || crop.height) {
      const cropX = (crop.x / 100) * imageWidth;
      const cropY = (crop.y / 100) * imageHeight;

      const cropWidth = (crop.width / 100) * imageWidth;
      const cropHeight = (crop.height / 100) * imageHeight;

      const canvas = document.createElement('canvas');
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(originImage, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
      canvas.toBlob((blob) => {
        const croppedImage = URL.createObjectURL(blob);
        component.setState({ croppedImage });
      }, 'image/jpeg');
    }
  }
  crop() {
    if (this.state.croppedImage) {
      this.props.file.preview = this.state.croppedImage;
    } else {
      this.props.file.preview = this.props.file.origin;
    }
    this.props.closeModal();
    this.props.onUpdate(this.props.file);
  }
  render() {
    return (
      <div className="text-center">
        <ReactCrop
          {...this.props.config}
          crop={this.state.crop}
          onImageLoaded={this.onImageLoaded}
          onComplete={this.onComplete}
          src={this.props.src}
        />
        <br /><br />
        <button className="hologram-btn" type="button" onClick={this.crop}>Save</button>
      </div>
    );
  }
}

export default CropperCom;

/* eslint
react/forbid-prop-types: 'warn',
no-restricted-syntax: 'warn',
jsx-a11y/no-noninteractive-element-interactions: 'off'
*/

import React from 'react';
import Modal from 'react-awesome-modal';
import PropTypes from 'prop-types';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import CropperCom from './Cropper';

class ModalCom extends React.Component {
  static propTypes = {
    file: PropTypes.object,
    cropperConfig: PropTypes.object,
    removeFile: PropTypes.func,
    cropperUpdate: PropTypes.func,
  };

  static defaultProps = {
    file: {},
    cropperConfig: {},
    removeFile: () => {},
    cropperUpdate: () => {},
  };

  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      visible: false,
    };
  }

  openModal() {
    this.setState({ visible: true });
  }

  closeModal() {
    this.setState({ visible: false });
  }

  handleClick() {
    this.props.removeFile(this.props.file);
  }

  render() {
    return (
      <div className="dropzone-image">
        <img alt="file preview" src={this.props.file.preview} onClick={this.openModal} />
        <FaTimesCircle className="remove-icon" onClick={() => this.handleClick()} />
        <Modal visible={this.state.visible} onClickAway={() => this.closeModal()} width="400">
          <CropperCom
            config={this.props.cropperConfig}
            src={this.props.file.origin}
            file={this.props.file}
            onUpdate={this.props.cropperUpdate}
            closeModal={this.closeModal}
          />
        </Modal>
      </div>
    );
  }
}

export default ModalCom;

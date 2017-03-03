import React from 'react';
import { Modal } from 'react-bootstrap';
import CropperCom from "./Cropper";

class ModalCom extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.state = {
      showModal: false
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render(){
    return (<div>
      <img className="dropzone-preview" src={this.props.file.preview} onClick={this.open}/>
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Body>
          <CropperCom
            config={this.props.cropperConfig}
            src={this.props.file.preview}
            file={this.props.file}
            onUpdate={this.props.cropperUpdate}
            closeModal={this.close.bind(this)}/>
        </Modal.Body>
      </Modal>
    </div>);
  }
}

export default ModalCom

import React from 'react';
import Modal from 'react-awesome-modal';
import CropperCom from "./Cropper";
import FaTimesCircle from 'react-icons/lib/fa/times-circle';

class ModalCom extends React.Component {
    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            visible : false
        };
    }

    openModal() {
        this.setState({visible : true});
    }

    closeModal() {
        this.setState({visible : false});
    }

    handleClick() {
      this.props.removeFile(this.props.file)
    }

    render(){
        return (
            <div className="dropzone-image">
                <img src={this.props.file['preview']} onClick={this.openModal.bind(this)}/>
                <FaTimesCircle className="remove-icon" onClick={() => this.handleClick()} />
                <Modal visible={this.state.visible} onClickAway={() => this.closeModal()} width="400">
                    <CropperCom
                        config={this.props.cropperConfig}
                        src={this.props.file['origin']}
                        file={this.props.file}
                        onUpdate={this.props.cropperUpdate}
                        closeModal={this.closeModal.bind(this)}/>
                </Modal>
            </div>
        );
    }
}

export default ModalCom

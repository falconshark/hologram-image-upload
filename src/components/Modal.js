import React from 'react';
import Modal from 'react-responsive-modal';
import CropperCom from "./Cropper";

class ModalCom extends React.Component {
    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            open: false
        };
    }

    openModal() {
        this.setState({open: true});
    }

    closeModal() {
        this.setState({open: false});
    }

    render(){
        return (
            <div className="dropzone-image">
                <img src={this.props.file['preview']} onClick={this.openModal.bind(this)}/>
                <Modal open={this.state.open} onClose={() => this.closeModal()}>
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

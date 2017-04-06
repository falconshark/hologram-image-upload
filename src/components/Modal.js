import React from 'react';
import {Modal} from 'react-bootstrap';
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
        this.setState({showModal: false});
    }

    open() {
        this.setState({showModal: true});
    }

    render(){
        return (<div>
            <div className="dropzone-image">
                <img className="img-responsive img-thumbnail" src={this.props.file['file'].preview} onClick={this.open.bind(this)}/>
            </div>
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                <Modal.Body>
                    <CropperCom
                        config={this.props.cropperConfig}
                        src={this.props.file['originFile'].preview}
                        file={this.props.file}
                        onUpdate={this.props.cropperUpdate}
                        closeModal={this.close.bind(this)}/>
                </Modal.Body>
            </Modal>
        </div>);
    }
}

export default ModalCom

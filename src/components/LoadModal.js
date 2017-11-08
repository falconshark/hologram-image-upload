/* eslint
react/forbid-prop-types: 'warn',
no-restricted-syntax: 'warn',
jsx-a11y/no-noninteractive-element-interactions: 'off'
*/

import React from 'react';
import Modal from 'react-responsive-modal';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

class LoadModalCom extends React.Component {
  static propTypes = {
    uploading: PropTypes.bool,
    error: PropTypes.object,
  };

  static defaultProps = {
    error: {},
    uploading: false,
  };

  constructor(props) {
    super(props);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.state = {
      modalLittle: true,
      open: false,
    };
  }

  onCloseModal() {
    this.props.uploading = false;
  }

  render() {
    return (
      <div className="loading-screen">
        <Modal
          little={this.state.modalLittle}
          modalClassName="loading-modal"
          open={this.props.uploading}
          showCloseIcon={false}
          onClose={() => this.onCloseModal()}
        >
          {Object.keys(this.props.error).length === 0 ?
            <div className="message">
              <ReactLoading type={'spin'} color={'#000000'} delay={'10'} className={'loading-icon'} />
              <p>Images uploading, please wait.....</p>
            </div> :
            <div className="message">
              <p>Oh, Look like there are some error ! </p>
              <p>Error message: {this.props.error.message}</p>
            </div>
          }
        </Modal>
      </div>
    );
  }
}

export default LoadModalCom;

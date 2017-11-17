/* eslint
react/forbid-prop-types: 'warn',
no-restricted-syntax: 'warn',
jsx-a11y/no-noninteractive-element-interactions: 'off'
*/

import React from 'react';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';

class LoadModalCom extends React.Component {
  static propTypes = {
    uploading: PropTypes.bool,
  };

  static defaultProps = {
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

  componentWillReceiveProps(prevProps) {
    if (prevProps.uploading === true) {
      this.setState({ open: true });
    } else {
      this.setState({ open: false });
    }
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="loading-screen">
        <Modal
          little={this.state.modalLittle}
          modalClassName="loading-modal"
          open={this.state.open}
          showCloseIcon={false}
          onClose={() => this.onCloseModal()}
        >
          <div className="message">
            <p>Images uploading, please wait.....</p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default LoadModalCom;

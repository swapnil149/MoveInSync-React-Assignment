import React from "react";
import "./styles.css";
import { invalidInput } from "./util";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      licenseNo: "",
      newColor: ""
    };
  }

  handleNewCarEntry = event => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value.toUpperCase()
    });
  };

  render() {
    const { licenseNo, newColor } = this.state;
    const {
      createModalWithValidation,
      errorInModal,
      availableSlots,
      closeModal
    } = this.props;
    return (
      <div className="modal">
        <div className="modal-main">
          {parseInt(availableSlots, 10) !== 0 ? (
            <div>
              <h1>Entry for new car</h1>
              <input
                name="licenseNo"
                value={licenseNo}
                placeholder="Enter Car No. Example: KA-46-XB-1917"
                onChange={this.handleNewCarEntry}
              />
              <input
                name="newColor"
                value={newColor}
                placeholder="Enter car color Example: Red"
                onChange={this.handleNewCarEntry}
              />
              <button
                onClick={() => {
                  createModalWithValidation(licenseNo, newColor);
                }}
              >
                Create Entry
              </button>
              <button onClick={closeModal}>Close</button>
              {errorInModal && errorInModal.length ? (
                <div>{invalidInput}</div>
              ) : null}
            </div>
          ) : (
            <div>
              <h1>"Sorry all slots are full"</h1>
              <button onClick={closeModal}>Close</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Modal;

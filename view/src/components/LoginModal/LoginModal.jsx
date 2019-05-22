import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

export default class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : true
        }
    }

    openModal = () => {
        this.setState({ visible : true });
    }

    closeModal = () => {
        this.setState({ visible : false });
    }

    render() {
        const { visible } = this.state;

        return (
            <section>
                <h1>React-Modal Examples</h1>
                <input type="button" value="Open" onClick={() => this.openModal()} />
                <Modal 
                    visible={ visible } 
                    width="400" 
                    height="300" 
                    effect="fadeInDown" 
                    onClickAway={ this.closeModal }
                >
                    <div>
                        <h1>Title</h1>
                        <p>Some Contents</p>
                        <button
                            onClick={ this.closeModal }
                        >
                            Close
                        </button>
                    </div>
                </Modal>
            </section>
        );
    }
}
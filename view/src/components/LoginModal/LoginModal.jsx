import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import './LoginModal.css';


class LoginContent extends Component {
    render() {
        const { handleCloseModal, switchAction } = this.props;

        return (
            <div className='modal-inner-content'>
                <h1>Login</h1>
                <p>This is the login page</p>

                <button onClick={ handleCloseModal }>
                    Close
                </button>

                <button onClick={ switchAction }>
                    sign up
                </button>
            </div>
        );
    }
}


class SignUpContent extends Component {
    render() {
        const { handleCloseModal, switchAction } = this.props;

        return (
            <div className='modal-inner-content'>
                <h1>Sign Up</h1>
                <p>This is the sign up </p>

                <button onClick={ handleCloseModal }>
                    Close
                </button>

                <button onClick={ switchAction }>
                    login
                </button>
            </div>
        );
    }
}



class ModalContent extends Component {
    state = {
        currentAction: 'login'      // either login or signup
    }

    switchAction = () => {
        this.setState(prevState => {
            const newAction = 
                prevState.currentAction === 'login'? 
                'signup' : 'login';

            return {
                currentAction: newAction
            };
        })
    }

    render() {
        const { handleCloseModal } = this.props;
        const { currentAction } = this.state;

        let content;
        if (currentAction === 'login') {
            content = <LoginContent 
                        handleCloseModal={ handleCloseModal }
                        switchAction={ this.switchAction }
                      />
        } else {
            content = <SignUpContent 
                        handleCloseModal={ handleCloseModal }
                        switchAction={ this.switchAction }
                      />
        }

        return content;
    }
}


class LoginModal extends Component {
    state = {
        visible : true
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
            <div id='login-modal'>
                <h1>React-Modal Examples</h1>
                <input type="button" value="Open" onClick={() => this.openModal()} />
                <Modal 
                    visible={ visible } 
                    width="600" 
                    height="500" 
                    effect="fadeInDown" 
                    onClickAway={ this.closeModal }
                >
                    <ModalContent 
                        handleCloseModal={ this.closeModal }
                    />
                </Modal>
            </div>
        );
    }
}


export default LoginModal;
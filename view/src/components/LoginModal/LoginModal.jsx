import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Row, Col } from 'react-bootstrap';
import './LoginModal.css';


// class LoginContent extends Component {
//     state = {

//     }

//     render() {
//         const { handleCloseModal, switchAction } = this.props;


//     }
// }


class SignUpContent extends Component {
    render() {
        const { handleCloseModal, switchAction } = this.props;

        return (
            <div className='modal-inner-content'>
                <h2>Create Account</h2>

                <button onClick={ handleCloseModal }>
                    Close
                </button>

                <button onClick={ this.handleSignUp }>
                    Sign Up
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
        currentAction: 'login',      // either login or signup
        email: '',
        password: ''
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

    handleSignIn = () => {
        console.log(this.state);
    }

    handleSignUp = () => {
        console.log(this.state);
    }

    handleEmailInput = e => {
        this.setState({ email: e.target.value });
    }

    handlePasswordInput = e => {
        this.setState({ password: e.target.value });
    }

    render() {
        const { handleCloseModal } = this.props;
        const { currentAction } = this.state;

        // confirm button types
        const _SignInButton = <button onClick={ this.handleSignIn }>
                                Sign In
                             </button>

        const _SignUpButton = <button onClick={ this.handleSignUp }>
                                Sign Up
                             </button>

        // action switch button types
        const _SwitchToSignInButton = <button onClick={ this.switchAction }>
                                switch to Sign In
                             </button>

        const _SwitchToSignUpButton = <button onClick={ this.switchAction }>
                                switch to Sign Up
                             </button>

        let ConfirmButton, SwitchActionButton, titleText;
        if (currentAction === 'login') {
            ConfirmButton = _SignInButton;
            SwitchActionButton = _SwitchToSignUpButton;
            titleText = 'Sign In';
        } else {
            ConfirmButton = _SignUpButton;
            SwitchActionButton = _SwitchToSignInButton;
            titleText = 'Sign Up';
        }


        return (
            <div className='modal-inner-content'>
                <h2>{ titleText }</h2>

                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        onChange={ this.handleEmailInput }
                    />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        onChange={ this.handlePasswordInput }
                    />
                </Form.Group>

                    <button onClick={ handleCloseModal }>
                        Close
                    </button>

                    { ConfirmButton }

                    { SwitchActionButton }
            </div>
        );
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
                <h2>React-Modal Examples</h2>
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
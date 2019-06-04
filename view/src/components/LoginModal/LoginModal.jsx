import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import './LoginModal.css';


class ModalContent extends Component {
    state = {
        currentAction: 'signin',      // either signin or signup
        email: '',
        password: ''
    }

    switchAction = () => {
        this.setState(prevState => {
            const newAction = 
                prevState.currentAction === 'signin'? 
                'signup' : 'signin';

            return {
                currentAction: newAction
            };
        })
    }

    handleSignIn = () => {
        this.props.handleSignIn(this.state);
    }

    handleSignUp = () => {
        this.props.handleSignUp(this.state);
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
        const _SignInButton = 
            <button 
                onClick={ this.handleSignIn }
                className='confirm-button'
            >
                Sign In
            </button>

        const _SignUpButton = 
            <button 
                onClick={ this.handleSignUp }
                className='confirm-button'
            >
                Sign Up
            </button>

        // action switch button types
        const _SwitchToSignInButton = 
            <div>
                already have an account?
                <a href='#' onClick={ this.switchAction }>
                    { ' Sign In' }
                </a>
            </div>

        const _SwitchToSignUpButton =             
            <div>
                don't have an account?
                <a href='#' onClick={ this.switchAction }>
                    { ' Sign Up' }
                </a>
            </div>

        // button to close modal
        const CloseModalButton = 
            <button 
                id='close-button'
                onClick={ handleCloseModal 
            }>
                <FontAwesomeIcon icon={['far', 'times']}/>
            </button>

        // select current button types according to current action
        let ConfirmButton, SwitchActionButton, titleText;
        if (currentAction === 'signin') {
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
                    <Form.Label>
                        <FontAwesomeIcon icon={['far', 'envelope']}/>
                        Email
                    </Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        onChange={ this.handleEmailInput }
                    />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>
                        <FontAwesomeIcon icon={['far', 'lock-alt']}/>
                        Password
                    </Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        onChange={ this.handlePasswordInput }
                    />
                </Form.Group>

                    { ConfirmButton }

                    { SwitchActionButton }

                    { CloseModalButton }
            </div>
        );
    }
}


class LoginModal extends Component {
    state = {
        visible : false
    }

    openModal = () => {
        this.setState({ visible : true });
    }

    closeModal = () => {
        this.setState({ visible : false });
    }

    handleSignIn = data => {
        console.log('signin', data);
        axios.post("http://localhost:3001/api/login", data)
            .then(res => {
                // console.log(res.data);
                if (res.data.success === true) {
                    const { user } = res.data;
                    localStorage.setItem('user', JSON.stringify(user));
                    alert('welcome!')
                } else {
                    alert('login failed!')
                }
                this.closeModal();
            })
    }

    handleSignUp = data => {
        console.log('signup', data);
        axios.post("http://localhost:3001/api/createUser", data)
            .then(res => {
                console.log(res.data);
                if (res.data.success === true) {
                    alert('sign up success!')
                } else {
                    alert('sign up failed!')
                }
                this.closeModal();
            })
    }

    handleSignOut = () => {
        localStorage.clear();
        this.forceUpdate();
    }

    showProfile = () => {
        let user = JSON.parse(localStorage.getItem('user'));
        const { email, createdAt } = user;
        alert(email + '\n\n' + createdAt);
    }

    render() {
        const { visible } = this.state;

        let hasUser = false;
        let user = localStorage.getItem('user');
        if (user) { 
            user = JSON.parse(user); 
            hasUser = true;
        }
        console.log(user, hasUser);

        const Button = hasUser ?
            <div className='button'>
                <button onClick={ this.showProfile }>
                    <FontAwesomeIcon icon={['far', 'user-astronaut']}/>
                    Profile
                </button>
                |
                <button onClick={ this.handleSignOut }>
                    Sign Out
                </button>
            </div>
            :
            <button onClick={ this.openModal } className='button'>
                <FontAwesomeIcon icon={['far', 'user-astronaut']}/>
                Login
            </button>


        return (
            <div id='login-modal'>
                { Button }
                <Modal 
                    visible={ visible } 
                    width="600" 
                    height="500" 
                    effect="fadeInDown" 
                    onClickAway={ this.closeModal }
                >
                    <ModalContent 
                        handleCloseModal={ this.closeModal }
                        handleSignIn={ this.handleSignIn }
                        handleSignUp={ this.handleSignUp }
                    />
                </Modal>
            </div>
        );
    }
}


export default LoginModal;
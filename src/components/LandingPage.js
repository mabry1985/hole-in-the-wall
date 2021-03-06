import React from 'react';
import LogIn from './LogIn.js';
import SignUp from './SignUp.js';
import logo from '../assets/images/logo-small.png';
import bg from '../assets/images/landing-page-bg.png';
import tempRoom from '../assets/images/landing-page-bg-room.png';
import './landing-page.css';
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { connect }  from 'react-redux';
import { Redirect } from 'react-router-dom'
import FullscreenModal from './FullscreenModal.js';

const FadeIn = styled.div`animation: 2500ms ${keyframes`${fadeIn}`}`


class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logIn: false,
      signUp: false,
      showModal: false
    }
  }
  
  // componentDidMount = () => {
  //   this.setState({showModal: true})
  // }

  handleClickLogIn = (state) => {
    const wrapper = document.getElementById('wrapper');
    wrapper.classList.toggle('is-nav-open')
    this.setState((prevState) => {
      if (this.state.logIn) {
        return { logIn: false }
      } else {
      return { logIn: true }
      }
    })
    console.log(this.state)
  }

  handleClickSignUp = (state) => {
    const wrapper = document.getElementById('wrapper');
    wrapper.classList.toggle('is-nav-open')
    this.setState((prevState) => {
      if (this.state.signUp) {
        return { signUp: false }
      } else {
        return { signUp: true }
      }
    })
    console.log(this.state)
  }

  handleModalToggle = () => {
    this.setState({showModal: false})
  }
  
  render() {
    let content = null;
    const { auth } = this.props;
    if (auth.uid) return <Redirect to='/main-menu' />
    // eslint-disable-next-line no-lone-blocks
    {if (!this.state.logIn && !this.state.signUp ) {
      content = 
       <FadeIn>
       <div className='landing-page'>
        <div className="landing-page-btns">
          <button
            className="log-in"
            onClick={this.handleClickLogIn}>
            Log In
            </button>
          <br />
          <button
            className="sign-up"
            onClick={this.handleClickSignUp}>
            Sign Up
            </button>
        </div>
        <img className="logo-landing-page" src={logo} alt="logo" />
        </div>
      </FadeIn>
    }}

    let modal = null;
    if (this.state.showModal) {
      modal = <FullscreenModal onModalToggle={this.handleModalToggle} />
    } 

    return (
      <main className="lp-background">
        {modal}
        <img
          id="wrapper"
          className= "wrapper landing-bg-layer" 
          src={bg} 
          alt="background layer" />
        {this.state.logIn ? <LogIn onClickLogIn={this.handleClickLogIn}/> : null}
        {this.state.signUp ? <SignUp onClickSignUp={this.handleClickSignUp}/> : null}
        <FadeIn>
          {content}
        </FadeIn>
          <div className="temp-room-bg">
            <img className="temp-room" src={tempRoom} alt=""/>
          </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(LandingPage)

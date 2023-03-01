import {Container, Nav, Navbar, Button, Row, Col} from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import {useState} from 'react';

import Logo from 'assets/images/Logo.png'
import NotificationIcon from 'assets/images/NotificationIcon.png'
import CartridgeIcon from 'assets/images/CartridgeIcon.png'
import UserAvatar from 'assets/images/UserAvatar.png'
import 'assets/css/layout/TopBar.css'

function TopBar() {

  const navigate = useNavigate(); 
  const toHomePage = () => { navigate('/')}
  const toLoginForm = () => { navigate('/login');}
  const toSignupForm = () => { navigate('/signup');}
  const toProfileForm = () => { navigate('/profile');}
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const userToken = useSelector(state => state.authenticationReducer.token)
  
  return (
    <div className='top-bar-header'>
      <Navbar className='top-bar' collapseOnSelect expand="md" variant="dark">
        <Container className='mx-6'>
          <Navbar.Brand className='brand px-2' onClick={toHomePage}>
            <img className='logo' src={Logo} alt='logo'></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Row className='w-100 d-flex justify-content-center'>
              <Col xs={12} md={2} lg={1} className='d-flex justify-content-center'>
                <Nav.Link className='nav-link' href="">About</Nav.Link>
              </Col>
              <Col xs={12} md={2} lg={1} className='d-flex justify-content-center'>
                <Nav.Link className='nav-link' href="">Pricing</Nav.Link>
              </Col>
              <Col xs={12} md={2} lg={1} className='d-flex justify-content-center'>
                <Nav.Link className='nav-link' href="">News</Nav.Link>
              </Col>
              <Col xs={12} md={3} lg={4} className='d-flex justify-content-center'>
                <Nav.Link href="/login" className='nav-link d-md-none' >Login</Nav.Link>
              </Col>
              <Col xs={12} md={3} lg={5} className='d-flex justify-content-center'>
                <Nav.Link href="/signup" className='nav-link d-md-none' >Sign up</Nav.Link>
              </Col>
            </Row>
            {userInfo === undefined || Object.keys(userInfo).length === 0 ? 
              <Nav className="nav-button-row d-none d-md-flex">
                <Button onClick={toLoginForm} className='nav-button login-button' id="login-button"> Login</Button>
                <Button onClick={toSignupForm} className='nav-button signup-button'  id="signup-button">Sign up</Button>
              </Nav> :
              <Nav className='nav-button-row d-none d-md-flex'>
                <div className='d-flex align-items-center px-2'>
                  <img className='nav-profile-icon' src={NotificationIcon} alt='notification' id="notification-icon"></img>
                </div>
                <div className='d-flex align-items-center px-2'>
                  <img className='nav-profile-icon' src={CartridgeIcon} alt='cartridge'  id="cartridge-icon"></img>
                </div>
                <div onClick={toProfileForm} className='d-flex align-items-center px-2'>
                  <img className='nav-profile-icon'  src={`data:image/jpeg;base64,${userInfo.avatar}`} alt='profile' id="profile-icon"></img>
                </div>
              </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default TopBar;
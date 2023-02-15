import {Container, Dropdown, Nav, Col, Row } from 'react-bootstrap';

import Logo from 'assets/images/BigLogo.png';
import WebIcon from 'assets/images/WebIcon.png';
import FacebookIcon from 'assets/images/FacebookIcon.png';
import InstagramIcon from 'assets/images/InstagramIcon.png';
import YoutubeIcon from 'assets/images/YoutubeIcon.png';
function Footer() {
  return (
    <div className='footer'>
      <Container className='mx-6 d-flex'>
        <Row className='w-100'>
            <Col xs={12} md={2} className='footer-section pt-4'>
                <img className='footer-logo' src={Logo} alt='logo'></img>
            </Col>
            <Col xs={6} md={2} className='footer-section d-inline pt-4' >
                <div className='footer-section-title'>Customer Service</div>
                <Nav.Link className='footer-section-link'>Frequently asked questions</Nav.Link>
                <Nav.Link className='footer-section-link'>How to buy</Nav.Link>
                <Nav.Link className='footer-section-link'>How to sell</Nav.Link>
                <Nav.Link className='footer-section-link'>Payment</Nav.Link>
                <Nav.Link className='footer-section-link'>Return & Refund</Nav.Link>
                <Nav.Link className='footer-section-link'>Warranty Policy</Nav.Link>
            </Col>
            <Col xs={6} md={2} className='footer-section d-inline pt-4'>
                <div className='footer-section-title'>About Fogi</div>
                <Nav.Link className='footer-section-link'>About us</Nav.Link>
                <Nav.Link className='footer-section-link'>Fogi Careers</Nav.Link>
                <Nav.Link className='footer-section-link'>Fogi Policies</Nav.Link>
                <Nav.Link className='footer-section-link'>Privacy Policy</Nav.Link>
                <Nav.Link className='footer-section-link'>Return & Refund</Nav.Link>
                <Nav.Link className='footer-section-link'>Warranty Policy</Nav.Link>
            </Col>
            <Col xs={6} md={3} lg={4} className='footer-section d-inline pt-4'>
                <div className='footer-section-title'>Follow us</div>
                <div className='footer-section-button d-flex'>
                    <Nav.Link className='footer-section-icon'>
                        <img className='bar-filter bar-filter-img' src={FacebookIcon} alt='facbook icon'></img>
                    </Nav.Link>
                    <Nav.Link className='footer-section-icon'>
                        <img className='bar-filter bar-filter-img' src={InstagramIcon} alt='insta icon'></img>
                    </Nav.Link>
                    <Nav.Link className='footer-section-icon'>
                        <img className='bar-filter bar-filter-img' src={YoutubeIcon} alt='youtube icon'></img>
                    </Nav.Link>
                </div>
            </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
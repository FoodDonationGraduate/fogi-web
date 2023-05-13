import {Container, Nav, Col, Row } from 'react-bootstrap';


import Logo from 'components/common/Logo';
import FacebookIcon from 'assets/images/FacebookIcon.png'
import InstagramIcon from 'assets/images/InstagramIcon.png'
import YoutubeIcon from 'assets/images/YoutubeIcon.png'
import 'assets/css/layout/Footer.css';

function Footer() {
  return (
    <div className='footer'>
      <Container className='mx-6 d-flex'>
        <Row className='w-100'>
            <Col xs={12} md={3} className='footer-section pt-4'>
                <Logo isWhite={false} usertype={0} isLarge={true} />
            </Col>
            <Col xs={6} md={3} className='footer-section d-inline pt-4' >
                <div className='footer-section-title'>Chăm sóc Khách hàng</div>
                <Nav.Link className='footer-section-link'>Các câu hỏi phổ biến</Nav.Link>
                <Nav.Link className='footer-section-link'>Chính sách bảo mật</Nav.Link>
                <Nav.Link className='footer-section-link'>Chính sách bảo hành</Nav.Link>
            </Col>
            <Col xs={6} md={3} className='footer-section d-inline pt-4'>
                <div className='footer-section-title'>Về Fogi</div>
                <Nav.Link className='footer-section-link'>Giới thiệu</Nav.Link>
                <Nav.Link className='footer-section-link'>Tuyển dụng</Nav.Link>
                <Nav.Link className='footer-section-link'>Điều khoản</Nav.Link>
            </Col>
            <Col xs={6} md={3} className='footer-section d-inline pt-4'>
                <div className='footer-section-title'>Theo dõi Fogi</div>
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
            {/* <Col xs={6} md={3} lg={2} className='footer-section d-inline pt-4'>
                <Dropdown className='dropdown-box d-flex'>
                <Dropdown.Toggle id="dropdown-basic" className='dropdown-toggle d-flex justify-content-right'>
                    <img className='bar-filter bar-filter-img' src={WebIcon} alt='web icon'></img>
                    <p className='bar-filter bar-filter-title'>English</p>
                </Dropdown.Toggle >
                <Dropdown.Menu className='dropdown-menu'>
                    <Dropdown.Item href="#/action-1">English</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Vietnamese</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </Col> */}
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
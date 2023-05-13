// Essentials
import { Button, Container, Form, Nav, Navbar, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

// Styling
import 'assets/css/layout/TopBar.css';

// Components
import Logo from 'components/common/Logo';

// Assets
import { MdOutlineNotificationsNone, MdOutlineShoppingCart } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

const TopBar = () => {
  const size = useResizer();
  const navigate = useNavigate(); 

  const toLoginForm = () => { navigate('/login'); }
  const toSignupForm = () => { navigate('/accounttype'); }
  const toProfileForm = () => { navigate('/profile'); }
  const toCartPage = () => { navigate('/cart'); }
  const userInfo = useSelector(state => state.authenticationReducer.user);

  return (
    <div className='top-bar-header'>
      <Navbar className='top-bar' collapseOnSelect expand='md' variant='dark'>
        <Container className='mx-6'>
          <Navbar.Brand className='brand px-2 py-2'>
            <Logo isWhite={true} usertype={0} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href=''>Giới thiệu</Nav.Link>
              <Nav.Link href=''>Tin tức</Nav.Link>
            </Nav>
            <Nav>
              {Object.keys(userInfo).length === 0 ?
                // Not logged in
                <>
                  {size > 1 ?
                    <Stack direction='horizontal' gap={2}>
                      {size > 2 && 
                        <Form className="search-form d-flex">
                          <Form.Control
                            type="search"
                            placeholder="Tìm kiếm"
                            className="search-box"
                            aria-label="Search"
                          />
                          <Button className='px-4' variant='dark'>
                            <FontAwesomeIcon icon={faSearch} />
                          </Button>
                        </Form>
                      }
                      <Button variant='outline-light' onClick={toLoginForm}>Đăng nhập</Button>
                      <Button variant='light' onClick={toSignupForm}>Đăng ký</Button>
                    </Stack>
                    :
                    <>
                      <Nav.Link href='/login'>Đăng nhập</Nav.Link>
                      <Nav.Link href='/signup'>Đăng ký</Nav.Link>
                    </>
                  }
                </>
                :
                // Logged in
                <>
                  {size > 1 ?
                    <Stack direction='horizontal' gap={4}>
                      {size > 2 && 
                        <Form className="search-form d-flex">
                          <Form.Control
                            type="search"
                            placeholder="Tìm kiếm"
                            className="search-box"
                            aria-label="Search"
                          />
                          <Button className='px-4' variant='dark'>
                            <FontAwesomeIcon icon={faSearch} />
                          </Button>
                        </Form>
                      }
                      <MdOutlineNotificationsNone className='top-bar-icon' />
                      <MdOutlineShoppingCart className='top-bar-icon' onClick={toCartPage}/>
                      <div onClick={toProfileForm} className='d-flex align-items-center'>
                        <img className='nav-profile-icon' src={`http://bachkhoi.online/static/${userInfo.avatar}`} alt='profile' id="profile-icon" />
                      </div>
                    </Stack>
                    :
                    <>
                      <Nav.Link href='/'>Thông báo</Nav.Link>
                      <Nav.Link href='/cart'>Giỏ hàng</Nav.Link>
                      <Nav.Link href='/profile'>Trang cá nhân</Nav.Link>
                    </>
                  }
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default TopBar;
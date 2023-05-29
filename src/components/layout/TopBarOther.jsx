// Essentials
import { Button, Container, Form, Nav, Navbar, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

// Styling
import 'assets/css/layout/TopBar.css';

// Components
import Logo from 'components/common/Logo';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

const TopBar = ({ user_type = 1 }) => {
  const size = useResizer();
  const navigate = useNavigate(); 

  const toProfileForm = () => { navigate('/profile'); }
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const date = new Date();

  return (
    <div className='top-bar-header'>
      <Navbar className='top-bar' collapseOnSelect expand='md' variant='dark'>
        <Container className='mx-6'>
          <Navbar.Brand className='brand px-2 py-2'>
            <Logo isWhite={true} usertype={user_type} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href=''>Giới thiệu</Nav.Link>
              {user_type === 1 && 
                <>
                  <Nav.Link href=''>Tin tức</Nav.Link>
                </>
              }
            </Nav>
            <Nav>
              <>
                {size > 1 ?
                  <Stack direction='horizontal' gap={4}>
                    <div onClick={toProfileForm} className='d-flex align-items-center'>
                      <img className='nav-profile-icon' src={`https://bachkhoi.online/static/${userInfo.avatar}?${date.getTime()}`} alt='profile' id="profile-icon" />
                    </div>
                  </Stack>
                  :
                  <>
                    <Nav.Link href='/profile'>Trang cá nhân</Nav.Link>
                  </>
                }
              </>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default TopBar;
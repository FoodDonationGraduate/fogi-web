// Essentials
import { Button, Container, Form, Nav, Navbar, Stack } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

// Styling
import 'assets/css/layout/TopBar.css';

// Components
import Logo from 'components/common/Logo';

// Assets
import { MdOutlineNotificationsNone, MdOutlineShoppingBag } from 'react-icons/md';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const TopBar = () => {
  const size = useResizer();
  const search = useLocation().search;
  const queryData = new URLSearchParams(search).get('query');
  const userInfo = useSelector(state => state.authenticationReducer.user);

  const date = new Date();
  const formSchema = Yup.object().shape({
    query: Yup.string()
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const navigate = useNavigate(); 
  
  const onSubmit = (data) => {
    navigate(`/products?query=${data.query}`)
  }
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
                        <Form className="search-form d-flex" onSubmit={handleSubmit(onSubmit)}>
                          <Form.Group>
                            <Form.Control
                              type="search"
                              placeholder="Tìm kiếm"
                              defaultValue={queryData ? queryData : ''}
                              className="search-box"
                              aria-label="Search"
                              {...register("query")}
                            />
                          </Form.Group>
                          <Button className='px-4' variant='dark' type='submit'>
                            <FontAwesomeIcon icon={faSearch} />
                          </Button>
                        </Form>
                      }
                      <Button variant='outline-light' onClick={() => navigate('/login')}>Đăng nhập</Button>
                      <Button variant='light' onClick={() => navigate('/accounttype')}>Đăng ký</Button>
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
                        <Form className="search-form d-flex" onSubmit={handleSubmit(onSubmit)}>
                          <Form.Group>
                            <Form.Control
                              type="search"
                              placeholder="Tìm kiếm"
                              defaultValue={queryData ? queryData : ''}
                              className="search-box"
                              aria-label="Search"
                              {...register("query")}
                            />
                          </Form.Group>
                          <Button className='px-4' variant='dark' type='submit'>
                            <FontAwesomeIcon icon={faSearch} />
                          </Button>
                        </Form>
                      }
                      <MdOutlineNotificationsNone className='top-bar-icon' />
                      <MdOutlineShoppingBag className='top-bar-icon' onClick={() => navigate('/cart')}/>
                      <div onClick={() => navigate('/profile')} className='d-flex align-items-center'>
                        <img className='nav-profile-icon' src={`http://bachkhoi.online/static/${userInfo.avatar}?${date.getTime()}`} alt='profile' id="profile-icon" />
                      </div>
                    </Stack>
                    :
                    <>
                      <Nav.Link href='/'>Thông báo</Nav.Link>
                      <Nav.Link href='/cart'>Túi nhận Quyên góp</Nav.Link>
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
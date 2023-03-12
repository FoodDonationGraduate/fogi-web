// Essentials
import * as React from 'react';
import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

// Components
import SideMenu from './components/SideMenu';
import UserProfile from '../profile_page/components/UserProfile';

// Styles
import './HomePage.css';

const HomePage = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <>
      <div className='bg'>
        <Row>
          <SideMenu
            activeIdx={activeIdx}
            setActiveIdx={setActiveIdx}
          />
          <Col>
            <Container className='workspace py-4'>
              <Row>
                <Col>
                
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomePage;
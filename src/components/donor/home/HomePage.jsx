// Essentials
import * as React from 'react';
import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

// Components & Pages
import SideMenu from './components/SideMenu';

import ProductListPage from './pages/products/ProductListPage';

// Styles
import 'assets/css/donor/HomePage.css';

const HomePage = () => {
  const [activeIdx, setActiveIdx] = useState(1);

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
                  {activeIdx === 1 && <ProductListPage />}
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
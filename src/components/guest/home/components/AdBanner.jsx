import { useRef } from 'react';
import { Button, Carousel, Container, Row, Stack } from 'react-bootstrap';
import Banner_1 from 'assets/images/AdBanner.svg';
import Banner_2 from 'assets/images/banner_2.jpg';
import Banner_3 from 'assets/images/banner_3.jpg';

// Assets
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

const AdBanner = () => {

  const ref = useRef(null);
  const onPrevClick = () => { ref.current.prev(); };
  const onNextClick = () => { ref.current.next(); };

  // Responsive handling
  let size = useResizer();

  return (
    <div className='ad-banner-body'>
      <Container className='ad-banner mx-6'>
        <div style={{ position: 'relative' }}>
          {size > 1 &&
            <Button style={{ position: 'absolute', top: '45%', zIndex: '1' }} variant='dark' onClick={onPrevClick}>
              <MdArrowLeft className='mb-1' />
            </Button>
          }
          <Row>
            <Carousel ref={ref} variant='light' controls={false}>
              <Carousel.Item interval={4000}>
                <Row>
                  <Col>
                  <img
                    className="d-block w-100"
                    src={Banner_1}
                    alt="First slide"
                  />
                  </Col>
                </Row>
              </Carousel.Item>
              <Carousel.Item interval={4000}>
                <Row>
                  <Col>
                  <img
                    className="d-block w-100"
                    src={Banner_1}
                    alt="Middle slide"
                  />
                  </Col>
                </Row>
              </Carousel.Item>
              <Carousel.Item interval={4000}>
                <Row>
                  <Col>
                  <img
                    className="d-block w-100"
                    src={Banner_1}
                    alt="Last slide"
                  />
                  </Col>
                </Row>
              </Carousel.Item>
            </Carousel>
          </Row>
          {size > 1 &&
            <Button style={{ position: 'absolute', top: '45%', right: '0', zIndex: '1' }} variant='dark' onClick={onNextClick}>
              <MdArrowRight className='mb-1' />
            </Button>
          }
        </div>
      </Container>
    </div>
  );
};

export default AdBanner;

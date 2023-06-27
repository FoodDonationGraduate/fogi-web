import { useRef } from 'react';
import { Button, Carousel, Container, Col, Row, Stack } from 'react-bootstrap';
import Banner_1 from 'assets/images/AdBanner.svg';
import Banner_2 from 'assets/images/banner_2.jpg';
import Banner_3 from 'assets/images/banner_3.jpg';

// Components
import CarouselButton from 'components/common/CarouselButton';

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
            <CarouselButton isLeft={true} onClick={onPrevClick} />
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
            <CarouselButton isLeft={false} onClick={onNextClick} />
          }
        </div>
      </Container>
    </div>
  );
};

export default AdBanner;

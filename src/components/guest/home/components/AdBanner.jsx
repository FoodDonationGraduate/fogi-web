import { useRef } from 'react';
import { Carousel, Container, Col, Row, Stack } from 'react-bootstrap';
import Banner_1 from 'assets/images/AdBanner.svg';

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
        {size <= 1 &&
          <div className='d-flex justify-content-center mt-3'>
            <Stack direction='horizontal' gap={3}>
              <CarouselButton isLeft={true} onClick={onPrevClick} isAbsolute={false} />
              <CarouselButton isLeft={false} onClick={onNextClick} isAbsolute={false} />
            </Stack>
          </div>
        }
      </Container>
    </div>
  );
};

export default AdBanner;

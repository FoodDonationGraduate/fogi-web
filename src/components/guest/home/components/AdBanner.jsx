import { Container, Col, Row, Carousel } from 'react-bootstrap';
import Banner_1 from 'assets/images/AdBanner.svg';
import Banner_2 from 'assets/images/banner_2.jpg';
import Banner_3 from 'assets/images/banner_3.jpg';


const AdBanner = () => {
  return (
    <div className='ad-banner-body'>
      <Container className='ad-banner mx-6 d-flex'>
        <Carousel>
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
      </Container>
    </div>
  );
};

export default AdBanner;

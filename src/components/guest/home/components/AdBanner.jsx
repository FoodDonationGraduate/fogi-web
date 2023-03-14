import { Carousel, Row } from 'react-bootstrap';
import Banner from 'assets/images/AdBanner.svg';

const AdBanner = () => {
  return (
    <div className='ad-banner-body'>
      <Row>
        <Carousel>
            <Carousel.Item interval={4000}>
                <img
                className="d-block w-100"
                src={Banner}
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={4000}>
                <img
                className="d-block w-100"
                src={Banner}
                alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={4000}>
                <img
                className="d-block w-100"
                src={Banner}
                alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
      </Row>
    </div>
  );
};

export default AdBanner;

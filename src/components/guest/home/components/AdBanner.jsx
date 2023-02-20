import { Carousel, Container } from 'react-bootstrap';
import Banner from 'assets/images/AdBanner.svg';

const AdBanner = () => {
  return (
    <div className='ad-banner-body'>
      <Container className='ad-banner mx-6 d-flex'>
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
      </Container>
    </div>
  );
};

export default AdBanner;

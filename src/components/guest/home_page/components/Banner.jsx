import {Carousel, Container} from 'react-bootstrap';
import AdBanner from 'assets/images/AdBanner.svg'
import 'assets/css/guest/home_pape/Banner.css'
function Banner() {
  return (
    <div className='ad-banner-body'>
      <Container className='ad-banner mx-6 d-flex'>
        <Carousel>
            <Carousel.Item interval={4000}>
                <img
                className="d-block w-100"
                src={AdBanner}
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={4000}>
                <img
                className="d-block w-100"
                src={AdBanner}
                alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={4000}>
                <img
                className="d-block w-100"
                src={AdBanner}
                alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={4000}>
                <img
                className="d-block w-100"
                src={AdBanner}
                alt="Fourth slide"
                />
            </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
}

export default Banner;
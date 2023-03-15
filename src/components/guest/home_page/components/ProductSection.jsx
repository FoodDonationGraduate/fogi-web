import {Card, Col, Row, Container, Button} from 'react-bootstrap';
import 'assets/css/guest/home_pape/ProductSection.css'
import {PRODUCT_DATA} from 'utils/constants/Product.jsx'
import { convertNumberToVnd } from 'utils/helpers/Money.jsx';
function ProductSection() {
  return (
    <div className='product-section-body'>
      <Container className='product-section mx-6 d-block'>
        <div className='section-title'>
            Almost out of stock
        </div>
        <div className='product-section-body'>
            <Row xs={2} md={3} lg= {6} className="g-4">
                {PRODUCT_DATA.map((item) => (
                    <Col>
                        <Card>
                            <Card.Img className='product-image mx-auto' variant="top" src={item.img} />
                            <Card.Body className='d-block justify-content-left px-2 py-2' >
                                <Card.Title className='product-title'>{item.title}</Card.Title>
                                <Card.Title className='product-price'>{convertNumberToVnd(item.price)}</Card.Title>
                            </Card.Body>
                            <Card.Footer className='d-block justify-content-left px-2 py-2' >
                                <Card.Title className='donor-product-title d-flex justify-content-left mb-1'>
                                    <img className='donor-product-logo' src={item.donorLogo} alt='donor logo'></img>
                                    <p className='donor-product-name pt-1'>{item.donorName}</p>
                                </Card.Title>
                                <Button className='card-green-button add-to-cart-button'>Add to cart</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
        <div className='product-section-footer d-flex justify-content-center'>
            <Button className='card-white-button view-more-button'>View More</Button>
        </div>
      </Container>
    </div>
  );
}

export default ProductSection;
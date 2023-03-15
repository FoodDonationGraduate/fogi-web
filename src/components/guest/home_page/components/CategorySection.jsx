import {Card, Col, Row, Container} from 'react-bootstrap';
import 'assets/css/guest/home_pape/CategorySection.css'
import {CATEGORY_DATA} from 'utils/constants/Category.jsx'
function CategorySection() {
  return (
    <div className='category-section-body'>
      <Container className='category-section mx-6 d-block'>
        <div className='section-title'>
            Categories
        </div>
        <div className='category-section-body'>
            <Row xs={2} md={3} lg= {6} className="g-4">
                {CATEGORY_DATA.map((item) => (
                    <Col className='mt-3'>
                        <Card>
                            <Card.Img className='category-image mx-auto' variant="top" src={item.img} />
                            <Card.Body className='d-flex justify-content-center px-0 py-2' >
                                <Card.Title className='category-title'>{item.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
      </Container>
    </div>
  );
}

export default CategorySection;
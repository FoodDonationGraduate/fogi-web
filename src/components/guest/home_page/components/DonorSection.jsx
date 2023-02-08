import {Card, Col, Row, Container, Button} from 'react-bootstrap';
import 'assets/css/DonorSection.css'
import {DONOR_DATA} from 'utils/constants/Donor.jsx'
function DonorSection() {
  return (
    <div className='donar-section-body'>
      <Container className='donar-section mx-6 d-block'>
        <div className='section-title'>
            Donors
        </div>
        <div className='donar-section-body'>
            <Row xs={1} md={3} className="g-4">
                {DONOR_DATA.map((item) => (
                    <Col>
                        <Card>
                            <Card.Img className='donar-cover mx-auto' variant="top" src={item.cover} />
                            <Card.Body className='d-block justify-content-left px-2 py-2' >
                                <Card.Title className='donar-title d-flex justify-content-left mb-1'>
                                    <img className='donar-logo' src={item.logo}></img>
                                    <p className='donar-name d-block pt-1 pl-4'>{item.name}</p>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
        <div className='donar-section-footer d-flex justify-content-center'>
            <Button className='view-more-button'>View More</Button>
        </div>
      </Container>
    </div>
  );
}

export default DonorSection;
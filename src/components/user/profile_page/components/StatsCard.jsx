import React from 'react'
import {Card, Container} from 'react-bootstrap';
import 'assets/css/user/profile_page/StatsCard.css'
import StarIcon from 'assets/images/StarIcon.png'
import OrderIcon from 'assets/images/OrderIcon.png'
function StatsCard() {
    return (
        <div className='stats-card-body'>
            <Container className='stats-card d-block'>
                <div className='stats-card-body'>
                    <Card>
                        <Card.Body className='d-block justify-content-left px-4 py-4' >
                            <Card.Title className='stats-item d-block justify-content-left'>
                                <div className='stats-item-title'>
                                    Reputation
                                </div>
                                <div className='stats-item-body d-flex justify-content-left'>
                                    <img className='stats-item-logo' src={StarIcon} alt='donor logo'></img>
                                    <p className='stats-item-number total-reputation d-block pt-1'>400</p>
                                </div>
                            </Card.Title>
                            <Card.Title className='stats-item d-block justify-content-left'>
                                <div className='stats-item-title'>
                                    Orders
                                </div>
                                <div className='stats-item-body d-flex justify-content-left'>
                                    <img className='stats-item-logo' src={OrderIcon} alt='donor logo'></img>
                                    <p className='stats-item-number total-orders d-block pt-1'>0</p>
                                </div>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
}

export default StatsCard;
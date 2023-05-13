// Essentials
import React from 'react'
import { Card, Container } from 'react-bootstrap';

// Assets
import 'assets/css/user/profile_page/StatsCard.css';
import { ReactComponent as StarIcon } from 'assets/images/reputation.svg';
import { ReactComponent as RequestIcon } from 'assets/images/request.svg';


function StatsCard() {
    return (
        <div className='stats-card-body'>
            <Container className='stats-card d-block'>
                <div className='stats-card-body'>
                    <Card>
                        <Card.Body className='d-block justify-content-left px-4 py-4' >
                            <Card.Title className='stats-item d-block justify-content-left'>
                                <div className='stats-item-title'>
                                    Điểm
                                </div>
                                <div className='stats-item-body d-flex justify-content-left'>
                                    <StarIcon />
                                    <p className='stats-item-number total-reputation d-block pt-1'>400</p>
                                </div>
                            </Card.Title>
                            <Card.Title className='stats-item d-block justify-content-left'>
                                <div className='stats-item-title'>
                                    Yêu cầu đã tạo
                                </div>
                                <div className='stats-item-body d-flex justify-content-left'>
                                    <RequestIcon />
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
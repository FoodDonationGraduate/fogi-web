import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import TopBar from "components/layout/TopBar.jsx";
import Footer from 'components/layout/Footer.jsx'
import StatsCard from './components/StatsCard'
import UserProfile from './components/UserProfile'
import ButtonCard from './components/ButtonCard'
import 'assets/css/user/profile_page/ProfilePage.css'

function HomePage(){
    return (
        <div className="profile-page">
            <div className="page-header">
                <TopBar/>
            </div>
            <div className="page-body">
                <div className='profile-section-body'>
                    <Container className='profile-section mx-6'>
                        <div className='section-title'>
                            My Profile
                        </div>
                        <div className='profile-section-body'>
                            <Row xs={1} lg={3} className="g-4">
                                <Col xs={12} lg={3}>
                                    <StatsCard/>
                                </Col>
                                <Col xs={12} lg={6}>
                                    <UserProfile/>
                                </Col>
                                <Col xs={12} lg={3}>
                                    <ButtonCard/>
                                </Col> 
                            </Row>
                        </div>
                    </Container>
                </div>
            </div>
            <div className="page-footer">
                <Footer/>
            </div>
        </div>
    )
}

export default HomePage
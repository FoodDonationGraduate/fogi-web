import {useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { retrieveProfile } from 'components/redux/reducer/AuthenticationReducer.jsx'

import TopBar from "components/layout/TopBar.jsx";
import Footer from 'components/guest/common/bars/Footer.jsx'
import Modal from "components/layout/InfoModal.jsx";
import StatsCard from './components/StatsCard'
import UserProfile from './components/UserProfile'
import ButtonCard from './components/ButtonCard'

import 'assets/css/user/profile_page/ProfilePage.css'

function ProfilePage(){
    const userInfo = useSelector(state => state.authenticationReducer.user)
    const userToken = useSelector(state => state.authenticationReducer.token)
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
     
    useEffect(() => {
        dispatch(retrieveProfile({userInfo, userToken}, navigate))
    },[])
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
                <Modal/>
            </div>
        </div>
    )
}

export default ProfilePage
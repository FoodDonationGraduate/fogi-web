import {useEffect} from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { retrieveProfile } from 'components/redux/reducer/AuthenticationReducer.jsx'

import TopBar from "components/layout/TopBar.jsx";
import Footer from 'components/layout/Footer';
import InfoModal from "components/layout/InfoModal.jsx";
import ConfirmModal from "components/layout/ConfirmModal.jsx";
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
                        {/* <div className='section-title'>
                            My Profile
                        </div> */}
                        <Row className='pt-1'>
                            <Col>
                                <h2>Hồ sơ người dùng</h2>
                            </Col>
                        </Row>
                        <div className='profile-section-body'>
                            <Row xs={1} lg={3} className="g-4">
                                <Col xs={12} lg={3}>
                                    <Stack direction='vertical' gap={4}>
                                        {/* <StatsCard/> */}
                                        <ButtonCard/>
                                    </Stack>
                                </Col>
                                <Col xs={12} lg={9}>
                                    <UserProfile/>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </div>
            <div className="page-footer">
                <Footer/>
                <InfoModal/>
                <ConfirmModal/>
            </div>
        </div>
    )
}

export default ProfilePage
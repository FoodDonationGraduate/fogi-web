import React from 'react'
import {Card, Container, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import 'assets/css/user/profile_page/ButtonCard.css'
import { logout } from 'components/redux/reducer/AuthenticationReducer';

function ButtonCard() {
    const userInfo = useSelector(state => state.authenticationReducer.user)
    const userToken = useSelector(state => state.authenticationReducer.token)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const LogOut = () => {
        dispatch(logout(navigate))
    }
    return (
        <div className='button-card-body'>
            <Container className='button-card d-block'>
                <div className='button-card-body'>
                    <Card className='p-2'>
                        <Card.Body className='d-block justify-content-left p-0' >
                            <Button className='card-button card-white-button change-password-button w-100 my-1'>Change Password</Button>
                            <Button className='card-button card-white-button order-history-button w-100 my-1'>Order History</Button>
                            <Button className='card-button card-white-button favorite-donors-button w-100 my-1'>Favorite Donors</Button>
                        </Card.Body>
                        <Card.Footer className='d-block justify-content-left p-0' >
                            <Button className='card-button card-white-button setiings-button w-100 my-1'>Setiings</Button>
                            <Button className='card-button card-white-button logout-button w-100 my-1' onClick={() => LogOut()}>Logout</Button>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
        </div>
    );
}

export default ButtonCard;
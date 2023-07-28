// Essentials
import React, { useState, useEffect } from 'react';
import { Container, Row, Stack, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Components
import ManageDetails from './components/ManageDetails';

const UserPage = () => {
  const dispatch = useDispatch();
  const { userType, userEmail } = useParams();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const user = {
    user_type: userType,
    email: userEmail
  }
  return (
    <Container>
        <ManageDetails user={user} />
    </Container>
  );
};

export default UserPage;

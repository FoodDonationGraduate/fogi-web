// Essentials
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

// Components
import ManageDetails from './components/ManageDetails';

const UserPage = () => {
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

// Essentials
import React from 'react';
import { Col, Row, Stack } from 'react-bootstrap';

// Components
import TableItemAvatar from '../components/TableItemAvatar';

const TableItemRequest = ({
  request
}) => {

  return (
    <>
      <Row>
        <Col xs={1}>
          <Stack direction='horizontal' gap={2}>
            <TableItemAvatar avatar={request.user.avatar} />
            huhu
          </Stack>
        </Col>
      </Row>    
    </>
  );
};

export default TableItemRequest;

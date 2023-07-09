// Essentials
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Stack } from 'react-bootstrap';

const DocumentModal = ({ user, show, handleClose}) => {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Giấy tờ tùy thân</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction='vertical' gap={4}>
          <img className='mb-4' src={`https://bachkhoi.online/static/${user.id_front}`} alt='id document'/>
          <img src={`https://bachkhoi.online/static/${user.id_back}`} alt='id document'/>
        </Stack>
        
      </Modal.Body>
    </Modal>
  );
};

export default DocumentModal;

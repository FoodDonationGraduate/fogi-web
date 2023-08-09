// Essentials
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Stack } from 'react-bootstrap';

const BackgroundMoal = ({ user, show, handleClose}) => {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Hoàn cảnh cá nhân</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Hoàn cảnh:</h5>
          <p>{user.background}</p>
        </div>
        
        <Stack direction='vertical' gap={4}>
          <h5>Hình ảnh chứng minh:</h5>
          {Object.keys(user.background_images).lengths !== 0 && user.background_images.map((item) => (
            <img className='mb-4' src={`https://bachkhoi.online/static/${item}`} alt='id document'/>
          ))}
        </Stack>
        
      </Modal.Body>
    </Modal>
  );
};

export default BackgroundMoal;

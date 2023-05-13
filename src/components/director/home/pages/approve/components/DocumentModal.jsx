// Essentials
import React from 'react';
import Modal from 'react-bootstrap/Modal';

// Asset
import IDCard from 'assets/images/CCCD.jpg';

const DocumentModal = ({ show, handleClose}) => {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Giấy tờ tùy thân</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img className='mb-4' src={IDCard} alt='id document'/>
        <img src={IDCard} alt='id document'/>
      </Modal.Body>
    </Modal>
  );
};

export default DocumentModal;

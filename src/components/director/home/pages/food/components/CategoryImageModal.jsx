// Essentials
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Avatar from 'react-avatar-edit';

const CategoryImageModal = ({ showImage, onClose, setImage }) => {

  // handle avatar
  const [preview, setPreview] = useState(null);
  const onBeforeFileLoad = (element) => {
    if (element.target.files[0].size > 10000000) {
      alert('Kích thước hình ảnh quá lớn!');
      element.target.value = '';
    }
  };

  const onSubmit = () => {
    if (preview) {
      setImage(preview);
    }
    onClose();
  };
  const onCloseImage = () => {
    setPreview(null);
    onClose();
  };

  return (
    <>
      <Modal
        show={showImage}
        onHide={onCloseImage}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thay đổi Ảnh Hạng mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Avatar
              width={'100%'}
              height={320}
              onCrop={(pv) => setPreview(pv)}
              exportAsSquare
              onClose={() => setPreview(null)}
              onBeforeFileLoad={onBeforeFileLoad}
              src={null}
            />
          </div>

          <div className='d-grid mt-4'>
            <Button
              className='fogi'
              variant='primary'
              onClick={onSubmit}
            >
              Xác nhận
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
};

export default CategoryImageModal;
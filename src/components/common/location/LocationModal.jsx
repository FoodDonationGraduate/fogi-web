// Essentials
import React, { useState } from 'react';
import { Button, Form, Modal, Stack } from 'react-bootstrap';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Components
import LocationItem from './LocationItem';

// Assets imports
import { FaExclamationTriangle } from 'react-icons/fa';
import { MdOutlineMap } from 'react-icons/md';

const LocationModal = ({ show, onClose }) => {

  const [state, setState] = useState(1); // 0: choose; 1: add; 2: edit
  const getTitle = () => {
    switch (state) {
      case 1: return 'Thêm';
      case 2: return 'Chỉnh sửa';
      default: return 'Chọn';
    }
  };

  // Form handling
  const formSchema = Yup.object().shape({
    name: Yup.string().required(''),
    address: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>{getTitle() + ' Địa điểm'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {state === 0 &&
            <>
              <LocationItem isAdd={true} setState={setState} />
              {Array.from({ length: 2 }).map((_, idx) => (
                <>
                  <hr className='my-2' />
                  <LocationItem setState={setState} />
                </>
              ))}
            </>
          }

          {state !== 0 && 
            <>
              <Form>

                <Form.Group className='mb-3'>
                  <Form.Label style={{ fontWeight: 'bold'}}>
                    Tên Địa điểm
                  </Form.Label>
                  <Form.Control {...register('name')} />
                  {errors.name && errors.name.type === 'required' && (
                    <p className="mt-2 error">
                      <FaExclamationTriangle className="mx-2" />
                      Bạn chưa điền tên địa điểm
                    </p>
                  )}
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label style={{ fontWeight: 'bold'}}>
                    Địa chỉ
                  </Form.Label>
                  <div className='d-flex justify-content-between'>
                    <Form.Control {...register('address')} />
                    <Button variant='dark'>
                      <MdOutlineMap style={{ width: '24px', height: '24px' }} />
                    </Button>
                  </div>
                  {errors.address && errors.address.type === 'required' && (
                    <p className="mt-2 error">
                      <FaExclamationTriangle className="mx-2" />
                      Bạn chưa điền địa chỉ
                    </p>
                  )}
                </Form.Group>

                <Stack direction='horizontal' gap={2}>
                  <Button variant='primary' className='fogi'>
                    {state === 1 ? 'Thêm Địa điểm' : 'Lưu thay đổi'}
                  </Button>
                  <Button variant='outline-secondary' onClick={() => setState(0)}>
                    Quay về
                  </Button>
                </Stack>

              </Form>
            </>
          }

        </Modal.Body>
      </Modal>
    </>
  )
};

export default LocationModal;
// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Assets
import { FaExclamationTriangle } from "react-icons/fa";

// Components
import Tooltip from 'components/common/Tooltip';
import UploadButton from 'components/common/UploadButton';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Reducers
import { createNews } from 'components/redux/reducer/NewsReducer';

const ReadModal = ({
  news
}) => {
  return (<>
    <Modal.Header className='fw-bold' closeButton>
      {news.title}
      {news.is_headline && <Badge className='ms-2' bg='success'>Nổi bật</Badge>}
    </Modal.Header>
    <Modal.Body>
      <img
        src={`https://bachkhoi.online/static/${news.image}`}
        style={{ maxHeight: '320px' }}
        alt='img'
      />
      <div className='mt-2'>{news.content}</div>
    </Modal.Body>
  </>);
};

const CreateModal = ({
  filterData,
  onHide
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch(); const navigate = useNavigate();

  // Form handling
  const formSchema = Yup.object().shape({
    title: Yup.string().required(''),
    content: Yup.string().required(''),
    url: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const imageOnly = 'image/png, image/gif, image/jpeg';
  const [image, setImage] = useState(null);
  const [image64, setImage64] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    if (!image) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      var base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      
      setImage64(base64String);
    }
    reader.readAsDataURL(image);
  }, [image]);
 
  const onSubmit = (data) => {
    if (!image) return;
    dispatch(createNews(
      {
        title: data.title,
        content: data.content,
        url: data.url,
        image: image64,
        filterData
      },
      { userInfo, userToken },
      navigate
    ));
    setImage(undefined);
    setIsSubmitted(false);
    reset(
      {
        title: '',
        content: '',
        url: ''
      }
    );

    onHide();
  };

  return (<>
    <Modal.Header className='fw-bold' closeButton>
      Tạo Tin tức
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className='mb-3'>
          <Form.Label style={{ fontWeight: 'bold' }}>
            Tiêu đề
          </Form.Label>
          <Form.Control
            {...register('title')}
          />
          {errors.title && errors.title.type === "required" && (
            <p className="mt-2 error">
              <FaExclamationTriangle className="mx-2" />
              Bạn chưa nhập tiêu đề
            </p>
          )}
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label style={{ fontWeight: 'bold' }}>
            Nội dung Tóm tắt
          </Form.Label>
          <Form.Control
            as='textarea'
            {...register('content')}
          />
          {errors.content && errors.content.type === "required" && (
            <p className="mt-2 error">
              <FaExclamationTriangle className="mx-2" />
              Bạn chưa nhập nội dung
            </p>
          )}
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label style={{ fontWeight: 'bold' }}>
            Hình ảnh{' '}
            <Tooltip tip={'Tooltip'} />
          </Form.Label>
          <UploadButton label='Tải ảnh' type={imageOnly} setValue={setImage}/>
          {isSubmitted && !image && (
            <p className="mt-2 error">
              <FaExclamationTriangle className="mx-2" />
              Bạn chưa đăng tải ảnh
            </p>
          )}
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label style={{ fontWeight: 'bold' }}>
            Đường dẫn
          </Form.Label>
          <Form.Control
            {...register('url')}
          />
          {errors.url && errors.url.type === "required" && (
            <p className="mt-2 error">
              <FaExclamationTriangle className="mx-2" />
              Bạn chưa nhập đường dẫn
            </p>
          )}
        </Form.Group>
        <Button
          className='fogi mt-2'
          variant='primary'
          type='submit'
          onClick={() => setIsSubmitted(true)}
        >
          Thêm Tin tức
        </Button>
      </Form>
    </Modal.Body>
  </>);
};

const NewsModal = ({
  news,
  show, onHide,
  type,
  filterData
}) => {

  return (<>
    <Modal show={show} onHide={onHide} size='lg'>
      {type === 'read' && <ReadModal news={news} />}
      {type === 'create' && <CreateModal filterData={filterData} onHide={onHide} />}
    </Modal>
  </>);
};

export default NewsModal;

// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Badge, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Assets
import { FaExclamationTriangle } from "react-icons/fa";

// Components
import UploadButton from 'components/common/UploadButton';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Reducers
import { createNews, updateNews } from 'components/redux/reducer/NewsReducer';

const ReadModal = ({
  news
}) => {
  return (<>
    <Modal.Header className='fw-bold' closeButton>
      {news.title}
      {news.is_headline && <Badge className='ms-2' bg='success'>Nổi bật</Badge>}
    </Modal.Header>
    <Modal.Body>
      <div className='d-flex'>
        <img
          alt='img'
          className='w-100'
          style={{ objectFit: 'cover', maxHeight: '320px' }}
          src={`https://bachkhoi.online/static/${news.image}`}
        />
      </div>
      <div className='mt-2'>{news.content}</div>
    </Modal.Body>
  </>);
};

// For update modal
const getBase64Image = (img) => {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/?[A-z]*;base64,/);
}

const CreateUpdateModal = ({
  news=null,
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
    url: Yup.string().required(''),
    is_headline: Yup.bool().required()
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const imageOnly = 'image/png, image/gif, image/jpeg';
  const [image, setImage] = useState(null);
  const [image64, setImage64] = useState(null);
  const [shownImage, setShownImage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Set data to current news if it's Edit Modal
  useEffect(() => {
    if (!news) return;

    reset({
      title: news.title,
      content: news.content,
      url: news.url,
      is_headline: news.is_headline
    });
  }, [news]);

  // Image handling
  useEffect(() => {
    if (!image) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setShownImage(reader.result);
    }
    reader.readAsDataURL(image);
  }, [image]);

  useEffect(() => {
    if (!shownImage) return;

    var base64String = shownImage.replace("data:", "").replace(/^.+,/, "");
    setImage64(base64String);
  }, [shownImage]);
 
  // On submit handling
  const onSubmit = (data) => {
    if ((!news && !image)) return;

    const submitData = {
      title: data.title,
      content: data.content,
      url: data.url,
      image: image64,
      is_headline: data.is_headline,
      filterData
    };

    if (!news) {
      dispatch(createNews(
        submitData,
        { userInfo, userToken },
        navigate
      ));
    } else {
      dispatch(updateNews(
        { ...submitData, id: news.id },
        { userInfo, userToken },
        navigate
      ));
    }
    setImage(undefined);
    setIsSubmitted(false);
    reset(
      {
        title: '',
        content: '',
        url: '',
        is_headline: false
      }
    );

    onHide();
  };

  return (<>
    <Modal.Header className='fw-bold' closeButton>
      {news ? 'Cập nhật': 'Thêm'} Tin tức
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
            Hình ảnh
          </Form.Label>
          <div className='d-flex'>
            {shownImage &&
              <img
                alt='img'
                className='w-100 my-2'
                style={{ objectFit: 'cover', maxHeight: '320px' }}
                src={shownImage}
              />
            }
            {news && !shownImage &&
              <img
                alt='img'
                className='w-100 my-2'
                style={{ objectFit: 'cover', maxHeight: '320px' }}
                src={`https://bachkhoi.online/static/${news.image}?${(new Date()).getTime()}`}
              />
            }
          </div>
          <UploadButton label={`Tải ảnh ${news ? 'mới' : ''}`} type={imageOnly} setValue={setImage}/>
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

        <Form.Group className='mb-3'>
          <Stack direction='horizontal' gap={2}>
            <Form.Label style={{ fontWeight: 'bold' }}>
              Tin nổi bật
            </Form.Label>
            <Form.Check
              className='mb-2'
              {...register('is_headline')}
            />
          </Stack>
          {errors.content && errors.content.type === "required" && (
            <p className="mt-2 error">
              <FaExclamationTriangle className="mx-2" />
              Bạn chưa nhập nội dung
            </p>
          )}
        </Form.Group>

        <Button
          className='fogi mt-2'
          variant='primary'
          type='submit'
          onClick={() => setIsSubmitted(true)}
        >
          {news ? 'Cập nhật' : 'Thêm'} Tin tức
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
    <Modal show={show} onHide={onHide} size='lg' backdrop={type === 'read' ? true : 'static'}>
      {type === 'read' && <ReadModal news={news} />}
      {type === 'create' && <CreateUpdateModal filterData={filterData} onHide={onHide} />}
      {type === 'edit' && <CreateUpdateModal news={news} filterData={filterData} onHide={onHide} />}
    </Modal>
  </>);
};

export default NewsModal;

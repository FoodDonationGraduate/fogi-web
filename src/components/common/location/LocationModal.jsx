// Essentials
import React, { useState } from 'react';
import { Button, Form, Modal, Stack, FormControl } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import { geocodeByAddress, getLatLng} from 'react-google-places-autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Components
import LocationItem from './LocationItem';
import { addNewAddress, updateAddress, retrieveAllAddresses, findAddress } from 'components/redux/reducer/AddressReducer';

// Assets imports
import { FaExclamationTriangle } from 'react-icons/fa';
import { MdOutlineMap } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

const LocationModal = ({ show, onClose }) => {
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const userToken = useSelector(state => state.authenticationReducer.token)
  const allAdresses = useSelector(state => state.addressReducer.allAdresses)
  
  const [coords, setCoords] =useState({
    lat: 10.762613,
    lng: 106.681868
  });
  const [selectedItem, setItem] = useState({});
  const [state, setState] = useState(0); // 0: choose; 1: add; 2: edit
  const getTitle = () => {
    switch (state) {
      case 1: return 'Thêm';
      case 2: return 'Chỉnh sửa';
      default: return 'Chọn';
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form handling
  const formSchema = Yup.object().shape({
    name: Yup.string().required(''),
    address: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, watch, handleSubmit, setValue, formState } = useForm(formOptions);
  const { errors } = formState;

  // Google map
  const updateMap = async () => {
    const address = watch("address", false);
    const lnglat = await dispatch(findAddress({address: address}));
    if (Object.keys(lnglat).length !== 0) {
      setCoords(lnglat);
    }
  }

  const onSubmit = async (data) => {
    await updateMap();
    data = {...data, lat: coords.lat, long: coords.lng}
    if (state === 1) {
      dispatch(addNewAddress(data, {userInfo, userToken}, navigate))
    } else {
      data = {...data, id: selectedItem.id}
      dispatch(updateAddress(data, {userInfo, userToken}, navigate))
    }
  }

  // Address handling
  React.useEffect(() => {
    dispatch(retrieveAllAddresses({userInfo, userToken},navigate))
  }, [])

  React.useEffect(() => {
    if (Object.keys(selectedItem).length !== 0) {
      setValue('name', selectedItem.name)
      setValue('address', selectedItem.address)
      setCoords({lat: selectedItem.lat, lng: selectedItem.long})
    }
  }, [selectedItem])

  React.useEffect(() => {
    if (state === 1) {
      setValue('name', '')
      setValue('address', '')
      setCoords({lat: 10.762613, lng: 106.681868})
    }
  }, [state])

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

          {/* Choose Location */}
          {state === 0 &&
            <>
              <LocationItem isAdd={true} setState={setState} />
              {(Object.keys(allAdresses).length !== 0 && allAdresses.addresses !== undefined) 
                && allAdresses.addresses.map((item, idx) => (
                  <div key={idx}>
                    <hr className='my-2' />
                    <LocationItem setState={setState} item={item} setItem={setItem} onClose={onClose} />
                  </div>
              ))}
            </>
          }

          {/* Add/Edit Location */}
          {state !== 0 && 
            <>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className='mb-3'>
                  <Form.Label style={{ fontWeight: 'bold'}}>
                    Tên Địa điểm
                  </Form.Label>
                  <Form.Control 
                    type='text'
                    {...register('name')} 
                  />
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
                    <Form.Control 
                      type='text'
                      {...register('address')} 
                    />
                    <Button variant='dark' onClick={(e) => updateMap()}>
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
                <div style={{ height: '40vh', width: '100%' }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyB0w2JiDGcjnMkVQzD_fOQF4ip0sFX9Bds" }}
                    center={coords}
                    defaultZoom={16}
                  >
                    <AnyReactComponent
                      lat={coords.lat}
                      lng={coords.lng}
                      text={<FaMapMarkerAlt color='red' style={{ width: '24px', height: '24px' }}/>}
                    />
                  </GoogleMapReact>
                </div>
                <Stack className='mt-3' direction='horizontal' gap={2}>
                  <Button variant='primary' className='fogi' type='submit'>
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
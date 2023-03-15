// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

// Components
import FormInput from '../../common/FormInput';

// Form handling
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Assets imports
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

// Style imports
import '../../../assets/css/Authentication.css';
import '../../../assets/css/Form.css';
import '../../../assets/css/Fogi.css';

const InformationForm = () => {
  const formSchema = Yup.object().shape({
    fullname: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = () => {
    console.log('login');
  };
  
  return (
    <div className='bg'>
      <Row className='d-flex justify-content-center align-items-center'>
        <Col lg={8}>
          <Card className='my-4 shadow'>
            <Container fluid>
              <Row className='mt-4'>
                <Col>
                  <Button variant='outline-secondary'>
                    <FaArrowLeft className='me-2 mb-1' />
                    Return
                  </Button>
                </Col>
              </Row>

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className='mt-4'>
                  <Col>
                    <h1>Volunteer Information Form</h1>
                  </Col>
                </Row>

                {/* -- Volunteer's Information -- */}
                <Row className='mt-4'>
                  <Col>
                    <header className='form-header'>
                      Volunteer's Information
                    </header>
                  </Col>
                </Row>
                <FormInput
                  label='Full name'
                  type='text'
                  register={register}
                />
                {errors.brandname && errors.brandname.type === "required" && (
                  <p className="mt-2 error">
                    <FaExclamationTriangle className="mx-2" />
                    Brand name is required
                  </p>
                )}
                <FormInput
                  label='Profile image'
                  type='file'
                  register={register}
                />
                <FormInput
                  label='Target region'
                  type='dropdown'
                  register={register}
                  items={['Techcombank', 'Agribank', 'Vietcombank']}
                />
                <FormInput
                  label='Image of Identity Document'
                  type='file'
                  tip='Identity Card or Passport'
                  register={register}
                />

                {/* -- Required documents Information -- */}
                <Row className='mt-4'>
                  <Col>
                    <header className='form-header'>
                      Bank Account Information
                    </header>
                  </Col>
                </Row>
                <FormInput
                  label='Image of Driving License'
                  type='file'
                  tip='Class A1 or A2'
                  register={register}
                />
                <FormInput
                  label='Image of Vehicle Registration Certificate'
                  type='file'
                  register={register}
                />

                {/* -- Bank account Information -- */}
                <Row className='mt-4'>
                  <Col>
                    <header className='form-header'>
                      Bank Account Information
                    </header>
                  </Col>
                </Row>
                <FormInput
                  label='Account owner'
                  type='text'
                  register={register}
                />
                <FormInput
                  label='Account ID'
                  type='number'
                  register={register}
                />
                <FormInput
                  label='Bank name'
                  type='dropdown'
                  register={register}
                  items={['Techcombank', 'Agribank', 'Vietcombank']}
                />
                <FormInput
                  label='Branch name'
                  type='text'
                  register={register}
                />

                <Row>
                  <Col>
                    <Button className='fogi my-4' variant='primary' type='submit'>
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
              
            </Container>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default InformationForm;

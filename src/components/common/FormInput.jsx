import * as React from 'react';
import { Col, Form, Row, Tooltip, OverlayTrigger, Dropdown, DropdownButton } from 'react-bootstrap';

import 'assets/css/Form.css';
import 'assets/css/Fogi.css';
import { FaQuestionCircle } from 'react-icons/fa';

const FormInput = ({label, type, tip, register}) => {
  const labelname = label.toLowerCase().trim();
  const tooltip = (props) => (
    <Tooltip {...props}>{tip}</Tooltip>
  );

  return (
    <Row className='mt-3'>
      <Col lg={4}>
        <header className='mt-1 label'>
          {label}{' '}
          {tip!==undefined && (
            <OverlayTrigger
              placement='top'
              overlay={tooltip}
            >
              <span>
                <FaQuestionCircle className='mb-1' />
              </span>
            </OverlayTrigger>
          )}
        </header>
      </Col>
      <Col>
        {type!=='dropdown' && (
          <Form.Group>
            <Form.Control
              type={type}
              {...register(`${labelname}`)}
            />
          </Form.Group>
        )}
        {type==='dropdown' && (
          <DropdownButton variant='outline-dark' title={label}>
            <Dropdown.Item>option</Dropdown.Item>
          </DropdownButton>
        )}
      </Col>
    </Row>
  );
};

export default FormInput;

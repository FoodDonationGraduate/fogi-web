// Essentials
import * as React from 'react';
import { Button, Card, Stack } from 'react-bootstrap';
import { EqualHeightElement } from 'react-equal-height';

// Sources
import { MdOutlineLocationOn, MdLinearScale, MdOutlineAccessTime } from 'react-icons/md';

// Styling
import './Card.css';

const DonorCard = ({donor}) => {
  return (
    <Card className='donor-card'>
      <Card.Img className='donor-card-storefront' 
        src={`https://bachkhoi.online/static/${donor.storefront}`}
        alt={donor.storefront} />
      <Card.Body>
        <EqualHeightElement name="donor-info">
          <Stack direction='horizontal' gap={4}>
            <img className='donor-logo-m' 
              src={`https://bachkhoi.online/static/${donor.avatar_filename}`} />
            <Stack direction='vertical' gap={1}>
              <h4>{donor.name}</h4>
              <Stack direction='vertical'>
                <small style={{ color: 'gray' }}>
                  <MdOutlineLocationOn className='me-2 mb-1' />
                  {donor.address}
                </small>
                {/* <small style={{ color: 'gray' }}>
                  <MdLinearScale className='me-2 mb-1' />
                  1.2 km away
                </small> */}
              </Stack>
            </Stack>
          </Stack>
        </EqualHeightElement>
        <EqualHeightElement name="donor-description">
          <p className='mt-2 mb-0'>
            {donor.description}
          </p>
        </EqualHeightElement>
      </Card.Body>
    </Card>
  );
};

export default DonorCard;

// Essentials
import React from 'react';
import { Button } from 'react-bootstrap';

// Assets
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const CarouselButton = ({
  isLeft,
  onClick
}) => {

  return (
    <Button className={`carousel-btn carousel-btn-${isLeft ? 'left' : 'right'}`} onClick={onClick}>
      {isLeft ?
        <MdChevronLeft size={28} />
        :
        <MdChevronRight size={28} />
      }
    </Button>
  );
};

export default CarouselButton;

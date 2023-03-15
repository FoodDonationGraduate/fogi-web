import { useState, useEffect } from 'react';

export function useResizer() {
  const [size, setSize] = useState(3);

  const handleResize = () => {
    if (window.innerWidth < 576) {
      setSize(0);
    } else if (window.innerWidth < 768) {
      setSize(1);
    } else if (window.innerWidth < 992) {
      setSize(2);
    } else {
      setSize(3);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });
  
  return size;
};
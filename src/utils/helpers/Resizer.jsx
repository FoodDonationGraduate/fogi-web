import { useState, useEffect } from 'react';

export function useResizer() {
  const [size, setSize] = useState(4);

  const handleResize = () => {
    if (window.innerWidth < 576) {
      setSize(0); // xs
    } else if (window.innerWidth < 768) {
      setSize(1); // sm
    } else if (window.innerWidth < 992) {
      setSize(2); // md
    } else if (window.innerWidth < 1200) {
      setSize(3); // lg
    } else {
      setSize(4); // xl
    }
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });
  
  return size;
};
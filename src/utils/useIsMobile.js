import { useState, useEffect } from 'react';

const useIsMobile = () => {
  const [mob, setMob] = useState(window.innerWidth <= 640);
  useEffect(() => {
    const h = () => setMob(window.innerWidth <= 640);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return mob;
};

export default useIsMobile;

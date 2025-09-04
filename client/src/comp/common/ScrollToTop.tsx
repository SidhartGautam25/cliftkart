import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = (): null => {
  // Extracts the pathname from the current location object
  const { pathname } = useLocation();

  // This useEffect hook will run every time the pathname changes
  useEffect(() => {
    // Scrolls the window to the top left corner (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // The dependency array ensures this effect runs only when the URL changes

  return null; // This component does not render any visible UI
};

export default ScrollToTop;
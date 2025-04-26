import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (isAuthPage) return null;

  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} GitHub Contribution Tracker — Built by Anas Muntazir 💻</p>
    </footer>
  );
};

export default Footer;

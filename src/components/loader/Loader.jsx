import React from 'react';
import './Loader.css';


function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
      </div>
    </div>
  );
}

export default Loader;

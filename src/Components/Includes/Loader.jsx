import React from 'react'

function Loader() {
  return (
    <>
    <div id="loader-wrapper">
        <div className="loader">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>
    </>
  );
}

export default Loader;
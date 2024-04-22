import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import ModalComponent from '../modal/Modal';
import DimentionSelector from '../dimention-selector';
import { close, hamburger } from '../../assets';

const ToolHeader = ({ screenSize, next, active, form, handleChange }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const [isNavigatorModalOpen, setIsNavigatorModalOpen] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const token = window?.localStorage.getItem('token');

  const NavigatorHandler = () => {
    if (window.localStorage.getItem('token')) {
      navigate('/');
    } else {
      setIsNavigatorModalOpen(true);
    }
  };

  const LinksRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (LinksRef.current && !LinksRef.current.contains(event.target)) {
          setShowLinks(false)
        }
    };

    if (showLinks) {
        document.addEventListener('mousedown', handleClickOutside);
    } else {
        document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [showLinks]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '62px',
          background: '#ffc107',
          padding: '10px 30px',
        }}
      >
        <div style={{ width: screenSize === "mobile" && "100%", justifyContent: screenSize === "mobile" && "space-between", display: 'flex', alignItems: 'center', gap: 40 }}>
          <p style={{ fontSize: '20px', fontWeight: 600, color: '#303032' }}>
            Logo
          </p>
          <img src={showLinks ? close : hamburger} className='hamburger-icon' onClick={() => setShowLinks(!showLinks)} />
          <div className='header-links'>
            <button
              onClick={NavigatorHandler}
              style={{
                width: '180px',
                height: '35px',
              }}
            >
              Back to Dashboard
            </button>
          </div>
          {/* {token &&
            <>
              <div className="header-links">
                {user?.role === 'admin' && (
                  <button
                    style={{ width: '180px', height: '35px' }}
                    onClick={() => navigate('/admin')}
                  >
                    {'Go to Admin Panel'}
                  </button>
                )}
              </div>
            </>
          } */}

          <div className="header-links">
            {/* {user?.role === 'admin' && ( */}
              <button
                style={{ width: '180px', height: '35px' }}
                onClick={() => navigate('/admin')}
              >
                {'Go to Admin Panel'}
              </button>
            {/* )} */}
          </div>
        </div>



        {screenSize === "mobile" ?
        <></>
        :
        <DimentionSelector
          next={next}
          active={active}
          handleChange={handleChange}
          form={form}
        />
        }
      </div>
      <div className={`mobile-links main ${showLinks ? "show-links" : ""}`} ref={LinksRef}>
      {showLinks && (
        <>
        <h2 onClick={
          () => navigate("/admin")
        }>Go to Admin Panel</h2>
          <h2 onClick={
            () => navigate('/')
          }>Back to Dashboard</h2>
        </>
      )}
      </div>
      <ModalComponent
        heading={'Confirm Navigation'}
        description={
          'As a guest account your estimation will not be saved if you decide to continue. Are  you sure you want to leave this page?'
        }
        btn1Text={'Cancel'}
        btn2Text={'Leave'}
        closeModal={() => setIsNavigatorModalOpen(false)}
        modalIsOpen={isNavigatorModalOpen}
        onSuccess={() => navigate('/')}
      />
    </>
  );
};

export default ToolHeader;

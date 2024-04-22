import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '../modal/Modal';
import { logout } from '../../services/authApi';
import ConfirmModal from '../modal/ConfirmModal';
import { hamburger, close } from '../../assets';

const Header = () => {
  const navigate = useNavigate();
  const token = window?.localStorage.getItem('token');
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const InAdmin = location.pathname === '/admin';
  const [showLinks, setShowLinks] = useState(false)
  const LinksRef = useRef(null);

  const NavigatorHandler = (data) => {
    if (data === "logout") {
      setLogoutModalOpen(true)
      setShowLinks(false)
    }
    else {
      navigate(data)
      setShowLinks(false)
    }
  }

  useEffect(() => {
    console.log(showLinks)
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

  const ShowLinksToggler = (e) => {
    e.preventDefault();
    setShowLinks(!showLinks);
    e.stopPropagation();
}





  return (
    <>
      <div className="header">
        <h2 style={{ color: '#000' }}>Logo</h2>
        <img src={showLinks ? close : hamburger} className='hamburger-icon' onClick={ShowLinksToggler} />

        {!token ? (
          <div className="header-links" >
            <button
              style={{ width: '180px' }}
              onClick={() => navigate(!InAdmin ? '/admin' : '/')}
            >
              {!InAdmin ? 'Go to Admin Panel' : 'Back to Dashboard'}
            </button>
            <button onClick={() => navigate('/sign-up')}>Signup</button>
            <button onClick={() => navigate('/login')}>Login</button>
          </div>
        ) : (
          <div className="header-links">
            {/* {user?.role === 'admin' && (
              <button
                style={{ width: '180px' }}
                onClick={() => navigate(!InAdmin ? '/admin' : '/')}
              >
                {!InAdmin ? 'Go to Admin Panel' : 'Back to Dashboard'}
              </button>
             )}  */}

            {/* // Code added to show button of admin panel for testing 👇 */}
            <button
              style={{ width: '180px' }}
              onClick={() => navigate(!InAdmin ? '/admin' : '/')}
            >
              {!InAdmin ? 'Go to Admin Panel' : 'Back to Dashboard'}
            </button>
            <button onClick={() => setLogoutModalOpen(true)}>Logout</button>
          </div>
        )}
      </div>
      <div className={`mobile-links ${showLinks ? "show-links" : ""}`} ref={LinksRef}>
        {showLinks && (
          <>
            <h2 onClick={
              () => NavigatorHandler(!InAdmin ? "/admin" : "/")
            }>{!InAdmin ? 'Go to Admin Panel' : 'Back to Dashboard'}</h2>

            {!token ? (<>
              <h2 onClick={
                () => NavigatorHandler('/sign-up')
              }>Signup</h2>
              <h2 onClick={
                () => NavigatorHandler('/login')
              }>Login</h2>
            </>) : (<>
              <h2 onClick={
                () => NavigatorHandler("logout")
              }>Logout</h2>
            </>)}
          </>
        )}
      </div>
      <ModalComponent
        heading={'Logout'}
        description={'Are you sure you want to logout?'}
        btn1Text={'Cancel'}
        btn2Text={'Logout'}
        closeModal={() => setLogoutModalOpen(false)}
        modalIsOpen={isLogoutModalOpen}
        onSuccess={() => {
          // navigate("/")
          logout();
          setLogoutModalOpen(false);
        }}
      />
      <ConfirmModal
        modalIsOpen={isSuccessModalOpen}
        closeModal={() => setIsSuccessModalOpen(false)}
      />
    </>
  );
};

export default Header;

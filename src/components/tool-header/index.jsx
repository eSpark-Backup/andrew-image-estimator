import React, { useState } from 'react';
import { SelectInput } from '../inputs/select-input';
import TextInput from '../inputs/text-input';
import { useNavigate } from 'react-router';
import ModalComponent from '../modal/Modal';

const ToolHeader = ({ next, active, form, handleChange }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const [isNavigatorModalOpen, setIsNavigatorModalOpen] = useState(false);
  const token = window?.localStorage.getItem('token');

  const NavigatorHandler = () => {
    if (window.localStorage.getItem('token')) {
      navigate('/');
    } else {
      setIsNavigatorModalOpen(true);
    }
  };

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <p style={{ fontSize: '20px', fontWeight: 600, color: '#303032' }}>
            Logo
          </p>
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
          {token &&
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
          }
        </div>



        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
          }}
        >
          {next >= 1 && (
            <div
              className={`${active === 'select' || form.unit !== '' ? 'active-inputs' : ''
                } tool-inputs-container tour`}
            >
              <p style={{ color: '#fff' }}>Measuring Unit:</p>
              <SelectInput
                autoOpen
                className="tool-inputs "
                name="unit"
                disabled={active !== 'select'}
                value={form.unit}
                options={[
                  { label: 'cm', value: 'cm' },
                  { label: 'inch', value: 'inch' },
                  { label: 'm', value: 'm' },
                  { label: 'mm', value: 'mm' },
                  { label: 'ft', value: 'ft' },
                ]}
                placeholder="Select Unit"
                handleChange={handleChange}
                header={true}
              />
              {active === 'select' && (
                <div className="unit-selector animation">
                  You can select the unit for measurement
                </div>
              )}
            </div>
          )}
          {next >= 3 && (
            <div
              className={`${active === 'height' || form.length ? 'active-inputs' : ''
                } tool-inputs-container tour`}
            >
              <p style={{ color: '#fff' }}>Height:</p>
              <TextInput
                disabled={active !== 'height'}
                className="tool-inputs "
                name="length"
                value={form.length}
                type="number"
                placeholder="Enter"
                handleChange={handleChange}
              />
              {active === 'height' && (
                <div className="dim-selector animation">
                  Add height of red flashing line to proceed.
                </div>
              )}
            </div>
          )}
          {next >= 4 && (
            <div
              className={`${active === 'length' || form.width ? 'active-inputs' : ''
                } tool-inputs-container tour`}
            >
              <p style={{ color: '#fff' }}>Length:</p>
              <TextInput
                disabled={active !== 'length'}
                className="tool-inputs "
                name="width"
                value={form.width}
                type="number"
                placeholder="Enter"
                handleChange={handleChange}
              />
              {active === 'length' && (
                <div className="dim-selector animation">
                  Add length of red flashing line to proceed.
                </div>
              )}
            </div>
          )}
        </div>
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

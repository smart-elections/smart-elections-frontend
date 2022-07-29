import './userProfile.scss';
import React, { useState } from 'react';

// Logout modal
import CustomMetaMaskModal from './CustomMetaMaskModal';

// State Context
import useAppStateContext from '../../hooks/useAppStateContext';

const UserProfile = () => {
  const {
    appState: { user },
    dispatch,
  } = useAppStateContext();

  // Temporarily until all user profile data are provided after login

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    // Do nothing if the user clicks outside the modal
    if (reason && reason === 'backdropClick') return;
    setOpen(false);
  };

  return (
    <>
      <div className='userProfileBlock'>
        <div className='mainTitle'>About you</div>
        <div className='infoBlock'>
          <p className='subTitle'>Social Security Number</p>
          <p className='info'>{user.citizen_ssn}</p>
          <div className='horizontal'>
            <p className='subTitle'>Username</p>
            <p className='info'>{user.username}</p>
          </div>
          {/* <div className='horizontal'>
            <div className='rightHorizontal'>
              <p className='subTitle'>Last Name</p>
              <p className='info'>{UserProfileData.LAST_NAME}</p>
            </div>
          </div> */}
          <p className='subTitle'>Gender</p>
          <p className='info'>
            {user.citizen_gender === 1 ? 'Male' : 'Female'}
          </p>
          {/* <p className='subTitle'>Place Of Birth</p> */}
          {/* <p className='info-caps'>{PLACE_OF_BIRTH}</p> */}
          <p className='subTitle'>Authority</p>
          <p className='info-caps'>{user.citizen_commune}</p>
          {/* <p className='subTitle'>Phone Number</p> */}
          {/* <p className='info'>{UserProfileData.PHONE_NUMBER}</p> */}
          <p className='subTitle'>MetaMask Wallet Address</p>
          <div className='metamask_box'>
            {user.wallet_address.length !== 0 ? (
              <p className='info'>{user.wallet_address}</p>
            ) : (
              <>
                <div className='horizontal'>
                  <p className='metamask_alert_msg'>
                    You have not added a MetaMask wallet address yet...
                  </p>
                </div>
                <div className='horizontal'>
                  <div className='rightHorizontal'>
                    <button
                      onClick={handleClickOpen}
                      className='metamask_alert_button'
                    >
                      Add Address
                    </button>
                    <CustomMetaMaskModal
                      citizen_ssn={user.citizen_ssn}
                      open={open}
                      handleClose={handleClose}
                      dispatch={dispatch}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

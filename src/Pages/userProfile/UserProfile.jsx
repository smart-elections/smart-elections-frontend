import './userProfile.scss';
import React, { useState } from 'react';

// Logout modal
import CustomMetaMaskModal from './CustomMetaMaskModal';

// State Context
import useAppStateContext from '../../hooks/useAppStateContext';

const FIRST_NAME = 'first_name';
const LAST_NAME = 'last_name';
const GENDER = 'gender';
const PLACE_OF_BIRTH = 'place_of_birth';
const AUTHORITY = 'authority';
const PHONE_NUMBER = 'phone_number';

const UserProfile = () => {
  const { appState, dispatch } = useAppStateContext();

  // Temporarily until all user profile data are provided after login
  const UserProfileData = {
    ...appState.user,
    FIRST_NAME,
    LAST_NAME,
    GENDER,
    PLACE_OF_BIRTH,
    AUTHORITY,
    PHONE_NUMBER,
  };

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
          <p className='info'>{UserProfileData.citizen_ssn}</p>
          <div className='horizontal'>
            <p className='subTitle'>First Name</p>
            <p className='info'>{UserProfileData.FIRST_NAME}</p>
          </div>
          <div className='horizontal'>
            <div className='rightHorizontal'>
              <p className='subTitle'>Last Name</p>
              <p className='info'>{UserProfileData.LAST_NAME}</p>
            </div>
          </div>
          <p className='subTitle'>Gender</p>
          <p className='info'>{UserProfileData.GENDER}</p>
          <p className='subTitle'>Place Of Birth</p>
          <p className='info-caps'>{UserProfileData.PLACE_OF_BIRTH}</p>
          <p className='subTitle'>Authority</p>
          <p className='info-caps'>{UserProfileData.AUTHORITY}</p>
          <p className='subTitle'>Phone Number</p>
          <p className='info'>{UserProfileData.PHONE_NUMBER}</p>
          <p className='subTitle'>MetaMask Wallet Address</p>
          <div className='metamask_box'>
            {UserProfileData.wallet_address.length !== 0 ? (
              <p className='info'>{UserProfileData.wallet_address}</p>
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
                      citizen_ssn={appState?.user.citizen_ssn}
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

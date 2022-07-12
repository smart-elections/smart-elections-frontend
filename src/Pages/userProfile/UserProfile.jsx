import './userProfile.scss';
import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';


// Logout modal
import CustomMetaMaskModal from './CustomMetaMaskModal';

var propAddress = "first";


const UserProfile = () => {
  const jsonData = require('./mock_data/user.json');

  const metaMaskAddress = jsonData.metamask_address;
  console.log(metaMaskAddress);

  console.log(jsonData);


  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const ActionButton = ({ handleClose }) => {
    const handleAddWallet = () => {
      handleClose(); // close modal
      bla();
      // TODO: add metamask wallet address to user's record
    };
    return (
      <button autoFocus onClick={handleAddWallet} className='actionButton'>
        Add Address
      </button>
    );
  };

  const CancelButton = ({ handleClose }) => (
    <button autoFocus onClick={handleClose} className='cancelButton'>
      Cancel
    </button>
  );

  function bla() {
    console.log(propAddress);
  }

  return (
    <>
      <div className='userProfileBlock'>
        <div className='mainTitle'>About you</div>
        <div className='infoBlock'>
          <p className='subTitle'>Citizen ID</p>
          {<p className='info'>{jsonData.citizen_id}</p>}
          <div className='horizontal'>
            <p className='subTitle'>First Name</p>
            {<p className='info'>{jsonData.first_name}</p>}
          </div>
          <div className='horizontal'>
            <div className='rightHorizontal'>
              <p className='subTitle'>Last Name</p>
              {<p className='info'>{jsonData.last_name}</p>}
            </div>
          </div>
          <p className='subTitle'>Gender</p>
          {<p className='info'>{jsonData.sex}</p>}
          <p className='subTitle'>Place Of Birth</p>
          {<p className='info-caps'>{jsonData.place_of_birth}</p>}
          <p className='subTitle'>Authority</p>
          {<p className='info-caps'>{jsonData.authority}</p>}
          <p className='subTitle'>Phone Number</p>
          {<p className='info'>{jsonData.phone_number}</p>}
          <p className='subTitle'>MetaMask Wallet Address</p>
          <div className='metamask_box'>
            {<p className='info'>{jsonData.metamask_address}</p>}
            <div className='metamask_alert_box' hidden={!metaMaskAddress == ""}>
              <div className='horizontal'>
                <p className='metamask_alert_msg'>You have not added a MetaMask wallet address yet...</p>
              </div>
              <div className='horizontal'>
                <div className='rightHorizontal'>
                  <button onClick={handleClickOpen} className='metamask_alert_button'>Add Address</button>
                  <CustomMetaMaskModal
                    onAddAddress={propAddress}
                    title='Add MetaMask Wallet Address'
                    contentMessage='Please enter your MetaMask wallet address:'
                    open={open}
                    handleClose={handleClose}
                    ActionButton={ActionButton}
                    CancelButton={CancelButton}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

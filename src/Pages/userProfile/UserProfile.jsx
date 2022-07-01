import './userProfile.scss';
import { useState } from 'react';

const UserProfile = () => {

  const jsonData = require('./mock_data/user.json');
  console.log(jsonData);

  return (<>
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
      </div>
    </div>
  </>)
};

export default UserProfile;

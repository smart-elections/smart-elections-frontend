export const signUpInputs = [
  {
    id: 1,
    name: 'citizen_ssn',
    type: 'text',
    placeholder: 'Social Security Number',
    required: true,
  },
  {
    id: 2,
    name: 'citizen_firstname',
    type: 'text',
    placeholder: 'First Name',
    required: true,
  },
  {
    id: 3,
    name: 'citizen_lastname',
    type: 'text',
    placeholder: 'Last Name',
    required: true,
  },
  {
    id: 4,
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    required: true,
  },
  {
    id: 5,
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    required: true,
  },
];

export const addMetaMaskAddressInputs = [
  {
    id: 1,
    name: 'citizen_ssn',
    type: 'text',
    placeholder: 'Social Security Number',
    required: true,
  },
  {
    id: 2,
    name: 'wallet_address',
    type: 'text',
    placeholder: 'MetaMask Wallet Address',
    required: true,
  },
];

export const loginInputs = [
  {
    id: 1,
    name: 'citizen_ssn',
    type: 'text',
    placeholder: 'Social Security Number',
    required: true,
  },
  {
    id: 2,
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    required: true,
  },
];

export const changePasswordInputs = [
  {
    id: 1,
    name: 'oldPassword',
    type: 'password',
    placeholder: 'Old Password',
    required: true,
    errorMessage: '',
  },
  {
    id: 2,
    name: 'newPassword',
    type: 'password',
    placeholder: 'New Password',
    required: true,
    errorMessage: '',
  },
  {
    id: 3,
    name: 'confirmNewPassword',
    type: 'password',
    placeholder: 'Confirm New Password',
    required: true,
    errorMessage: '',
  },
];

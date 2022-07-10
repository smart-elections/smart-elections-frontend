export const signUpFormValidation = (setFormErrors, name, value) => {
  setFormErrors((prev) => {
    const errorStateObj = { ...prev, [name]: '' };

    switch (name) {
      case 'ssn':
        if (!(value.length === 13)) {
          errorStateObj[name] =
            'Social Security Number must be of 13 characters';
        }
        break;

      case 'password':
        if (value.length < 12) {
          errorStateObj[name] =
            'Password must consist of at least 12 characters';
        }
        break;

      default:
        break;
    }

    return errorStateObj;
  });
};

export const addMetaMaskWalletFormValidation = (setFormErrors, name, value) => {
  setFormErrors((prev) => {
    const errorStateObj = { ...prev, [name]: '' };

    switch (name) {
      case 'ssn':
        if (!(value.length === 13)) {
          errorStateObj[name] =
            'Social Security Number must be of 13 characters';
        }
        break;

      case 'wallet':
        if (!(value.length === 42)) {
          errorStateObj[name] = 'Invalid MetaMask Wallet Address';
        }
        break;

      default:
        break;
    }

    return errorStateObj;
  });
};

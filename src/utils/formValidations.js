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

export const changePasswordFormValidation = (
  setFormErrors,
  formValues,
  name,
  value
) => {
  setFormErrors((prev) => {
    const stateObj = { ...prev, [name]: '' };

    switch (name) {
      case 'oldPassword':
        if (value.length < 6) {
          stateObj[name] = 'Password must be at least 6 characters';
        }
        break;

      case 'newPassword':
        if (
          formValues.confirmNewPassword &&
          value !== formValues.confirmNewPassword
        ) {
          stateObj[name] = 'Password and Confirm Password does not match.';
        }
        break;

      case 'confirmNewPassword':
        if (formValues.newPassword && value !== formValues.newPassword) {
          stateObj[name] = 'Password and Confirm Password does not match.';
        }
        break;

      default:
        break;
    }

    return stateObj;
  });
};

import { useState } from 'react';
import './changePassword.scss';
import Logo from '../../assets/images/Logo.png';
import FormInput from '../../components/formInput/FormInput';

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const ChangePassword = () => {
  const [formValues, setFormValues] = useState(initialState);

  const [formErrors, setFormErrors] = useState({});

  const inputs = [
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noErrors = Object.values(formErrors).every((x) => x === '');
    if (noErrors) {
      // TODO: call API to change password
      console.log(formErrors);
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    validateInput(name, value);
  };

  // ✅ Validate input
  // TODO: Add more validation rules
  const validateInput = (name, value) => {
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

  return (
    <div className='Auth-form-container'>
      <div>
        <img
          src={Logo}
          alt='Logo de la République française (1999)'
          height={160}
          width={250}
        />
      </div>
      <form className='Auth-form' onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={formValues[input.name]}
            errorMessage={formErrors[input.name] && formErrors[input.name]}
            onChange={onInputChange}
          />
        ))}

        <button type='submit' className='changePasswordButton'>
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;

import { useState } from 'react';

// Assets
import Logo from '../../assets/images/Logo.png';

// Data
import { changePasswordInputs } from '../../data/formInputs';

// Components
import FormInput from '../../components/formInput/FormInput';

// Utils
import { changePasswordFormValidation } from '../../utils/formValidations';

// Styles
import './changePassword.scss';

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const ChangePassword = () => {
  const [formValues, setFormValues] = useState(initialState);

  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noErrors = Object.values(formErrors).every((x) => x === '');
    if (noErrors) {
      // TODO: call API to change password
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    changePasswordFormValidation(setFormErrors, formValues, name, value);
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
        {changePasswordInputs.map((input) => (
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

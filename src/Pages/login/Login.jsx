import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import './login.scss';
import Logo from '../../assets/images/Logo.png';
import FormInput from '../../components/formInput/FormInput';

import { loginInputs } from '../../data/formInputs';
import { loginFormValidation } from '../../utils/formValidations';

const initialState = {
  citizen_ssn: '',
  password: '',
};

const Login = () => {
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noErrors = Object.values(formErrors).every((err) => err === '');
    if (noErrors) {
      // TODO: API call to login
      // calling the backend api 'login' to login the user

      console.log(formValues);

      await axios
        .post('/accounts/login', formValues)
        .then((response) => {
          console.log(response);
          console.log(response.data.data);

          if (response.status === 200) {
            toast.success("You're logged in!");

            // Add the user to local storage
            localStorage.setItem(
              'SmartElectionsProfile',
              JSON.stringify({ ...response.data.data, isAuthenticated: true })
            );

            navigate('/elections');
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          console.error('Login form: There was an error!', error);
        });
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    loginFormValidation(setFormErrors, name, value);
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
        {loginInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={formValues[input.name]}
            errorMessage={formErrors[input.name] && formErrors[input.name]}
            onChange={onInputChange}
          />
        ))}

        <button type='submit' className='loginButton'>
          Sign in
        </button>

        <div className='noPassword'>
          <span>Don't have a password yet?</span>
          <Link to='/register' className='SMS_Signup'>
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

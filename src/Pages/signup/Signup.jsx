import { useState } from 'react';
import './signup.scss';
import Logo from '../../assets/images/Logo.png';
import FormInput from '../../components/formInput/FormInput';
import { Link } from 'react-router-dom';

const initialState = {
  socialSecurityNumber: '',
  password: '',
  confirmPassword: '',
  metaMaskAddress: '',
};

const Signup = () => {
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  const inputs = [
    {
      id: 1,
      name: 'socialSecurityNumber',
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
    {
      id: 3,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      required: true,
    },
    {
      id: 4,
      name: 'metaMaskAddress',
      type: 'text',
      placeholder: 'MetaMask Wallet Address',
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noErrors = Object.values(formErrors).every((err) => err === '');
    if (noErrors) {
      // TODO: call API to login
      console.log(formErrors);
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    validateInput(name, value);
  };

  // ✅ Validate input
  // TODO: Add more validation rules
  const validateInput = (name, value) => {
    setFormErrors((prev) => {
      const stateObj = { ...prev, [name]: '' };

      switch (name) {
        case 'socialSecurityNumber':
          if (!(value.length === 13)) {
            stateObj[name] = 'Social Security Number must be of 13 characters';
          }
          break;

        case 'password':
          if (value.length < 12) {
            stateObj[name] = 'Password must consist of at least 12 characters';
          }
          break;

        case 'confirmPassword':
          if (formValues.password && value !== formValues.password) {
            stateObj[name] = 'Password and Confirm Password does not match';
          }
          break;

        case 'metaMaskAddress':
          if (!(value.length === 42)) {
            stateObj[name] = 'Invalid MetaMask Wallet Address';
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

        <button type='submit' className='loginButton'>
          Sign up
        </button>

        <div className='noPassword'>
          <span>Already have an account?</span>
          <Link to='/' className='SMS_Signup'>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;

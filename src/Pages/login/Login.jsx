import { useState } from 'react';
import './login.scss';
import Logo from '../../assets/images/Logo.png';
import FormInput from '../../components/formInput/FormInput';
import { Link } from 'react-router-dom';

const initialState = {
  socialSecurityNumber: '',
  password: '',
};

const initialErrorMessages = {
  socialSecurityNumberError: '',
  passwordError: '',
};

const Login = () => {
  const [formValues, setFormValues] = useState(initialState);
  const { socialSecurityNumber, password } = formValues;

  const [formErrors, setFormErrors] = useState(initialErrorMessages);

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
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socialSecurityNumber && password) {
      // call login function
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
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
            onChange={onInputChange}
          />
        ))}

        <button type='submit' className='loginButton'>
          Login
        </button>

        <div className='noPassword'>
          <span>Don't have a password yet?</span>
          <Link to='/' className='SMS_Signup'>
            Sign up with SMS
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

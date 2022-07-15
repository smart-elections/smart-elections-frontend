import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

// Styles
import './signup.scss';

// Assets
import Logo from '../../assets/images/Logo.png';

// Data
import { signUpInputs } from '../../data/formInputs';

// Components
import FormInput from '../../components/formInput/FormInput';
import MetaMaskWallet from '../../components/metaMaskWallet/MetaMaskWallet';

// utils
import { signUpFormValidation } from '../../utils/formValidations';

// register function
import { register } from '../../services/accounts.services';

const initialState = {
  citizen_ssn: '',
  citizen_firstname: '',
  citizen_lastname: '',
  username: '',
  password: '',
};

const Signup = () => {
  const [formValues, setFormValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  // metamask modal state and functions
  const [open, setOpen] = useState(false);

  const handleOpenMetaMaskFormModal = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    // Do nothing if the user clicks outside the modal
    if (reason && reason === 'backdropClick') return;
    setOpen(false);
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formValues);

    const noErrors = Object.values(formErrors).every((err) => err === '');
    if (noErrors) {
      // calling the backend api 'signup' to register the user
      register(formValues, handleOpenMetaMaskFormModal);
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    signUpFormValidation(setFormErrors, name, value);
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
        {signUpInputs.map((input) => (
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
      <MetaMaskWallet open={open} handleClose={handleClose} />
    </div>
  );
};

export default Signup;

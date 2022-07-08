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
    window.location.reload(false);
    navigate('/elections');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formValues);

    const noErrors = Object.values(formErrors).every((err) => err === '');
    if (noErrors) {
      // calling the backend api 'signup' to sign up the user
      await axios
        .put('/accounts/signup', formValues)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          if (response.status === 200) {
            toast.success(response.data.message);
            delete formValues.password;
            // TODO: Add the user to local storage
            localStorage.setItem(
              'SmartElectionsProfile',
              JSON.stringify({ ...formValues, isAuthenticated: true })
            );

            // when registration is successful, open the metamask modal to add the metamask wallet then after that navigate to the elections page
            handleOpenMetaMaskFormModal();
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          console.error('Sign up form: There was an error!', error);
        });
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

import axios from 'axios';
import { toast } from 'react-toastify';

export const login = async (formValues, dispatch, navigate) => {
  await axios
    .post('/accounts/login', formValues)
    .then((response) => {
      console.log(response);
      console.log(response.data.data);

      if (response.status === 200) {
        toast.success("You're logged in!");

        dispatch({
          type: 'Login',
          payload: response.data.data,
        });

        navigate('/elections');
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((error) => {
      console.error('Login form: There was an error!', error);
    });
};

export const register = async (formValues, handleOpenMetaMaskFormModal) => {
  await axios
    .put('/accounts/signup', formValues)
    .then((response) => {
      console.log(response);
      console.log(response.data);
      if (response.status === 200) {
        toast.success(response.data.message);

        // when registration is successful, open the metamask modal to add the metamask wallet then after that navigate to the elections page
        handleOpenMetaMaskFormModal();
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((error) => {
      console.error('Sign up form: There was an error!', error);
    });
};

export const addMetaMaskWallet = async (formValues, handleClose) => {
  await axios
    .put('accounts/add/wallet', formValues)
    .then((response) => {
      console.log(response);
      console.log(response.data);

      if (response.status === 200) {
        toast.success('MetaMask wallet address registered!');

        // when successful, close the modal and navigate to the elections page
        handleClose();
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((error) => {
      console.error('MetaMask Wallet: There was an error!', error);
    });
};

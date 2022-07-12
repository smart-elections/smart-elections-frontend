import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

// Material UI
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';

// components
import FormInput from '../formInput/FormInput';

// data
import { addMetaMaskAddressInputs } from '../../data/formInputs';

// utils
import { addMetaMaskWalletFormValidation } from '../../utils/formValidations';

// styles
import '../modal/customModal.scss';

const MetaMaskWallet = ({ open, handleClose }) => {
  const [formValues, setFormValues] = useState({ ssn: '', wallet: '' });
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    addMetaMaskWalletFormValidation(setFormErrors, name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noErrors = Object.values(formErrors).every((err) => err === '');
    if (noErrors) {
      // TODO: test out the axios call
      // calling the backend api 'addWallet' to add the metamask wallet
      await axios
        .put('accounts/add/wallet', formValues)
        .then((response) => {
          console.log(response);
          console.log(response.data);

          if (response.status === 200) {
            toast.success(response.data.message);
            const userProfile = localStorage.getItem('SmartElectionsProfile');
            localStorage.setItem(
              'SmartElectionsProfile',
              JSON.stringify({
                ...JSON.parse(userProfile),
                wallet: formValues.wallet,
              })
            );

            // when successful, close the modal and navigate to the elections page
            handleClose();
            window.location.reload(false);
            navigate('/elections');
          }

          if (response.status === 202) {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          console.error('MetaMask Wallet: There was an error!', error);
        });
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <CustomModalTitle id='customized-dialog-title'>
          Add Your MetaMask Wallet Address
        </CustomModalTitle>

        <DialogContent dividers>
          <form className='Auth-form' onSubmit={handleSubmit}>
            {addMetaMaskAddressInputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={formValues[input.name]}
                errorMessage={formErrors[input.name] && formErrors[input.name]}
                onChange={onInputChange}
              />
            ))}

            <div className='dialogActions'>
              <button autoFocus type='submit' className='actionButton'>
                Add
              </button>
              <button autoFocus onClick={handleClose} className='cancelButton'>
                Add later
              </button>
            </div>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '25px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
    width: '450px',
    textAlign: 'center',
  },
  '& .MuiTypography-root': {
    fontSize: 18,
    fontWeight: 'medium',
  },
  '& .MuiIconButton-root:hover': {
    backgroundColor: '#EBECF7',
    color: '#3A44B1',
  },
}));

const CustomModalTitle = (props) => {
  const { children, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
      }}
      {...other}
    >
      {children}
    </DialogTitle>
  );
};

CustomModalTitle.propTypes = {
  children: PropTypes.node,
};

export default MetaMaskWallet;

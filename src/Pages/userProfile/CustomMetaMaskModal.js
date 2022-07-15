import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Material-UI
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';

// Styling
import './customMetaMaskModal.scss';

// components
import FormInput from '../../components/formInput/FormInput';

// Functions
import { addMetaMaskWalletFormValidation } from '../../utils/formValidations';
import { addMetaMaskWallet } from '../../services/accounts.services';

const CustomMetaMaskModal = ({ citizen_ssn, open, handleClose, dispatch }) => {
  const [formValues, setFormValues] = useState({
    citizen_ssn: citizen_ssn,
    wallet_address: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    addMetaMaskWalletFormValidation(setFormErrors, name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noErrors = Object.values(formErrors).every((err) => err === '');
    if (noErrors) {
      // calling the backend api 'addWallet' to add the metamask wallet
      addMetaMaskWallet(formValues, handleClose, dispatch);
    }
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <CustomMetaMaskModalTitle
          id='customized-dialog-title'
          onClose={handleClose}
        >
          Add MetaMask Wallet Address
        </CustomMetaMaskModalTitle>

        <DialogContent dividers>
          <Typography gutterBottom>
            Please enter your MetaMask wallet address:
          </Typography>

          <form className='Auth-form' onSubmit={handleSubmit}>
            <FormInput
              type='text'
              name='wallet_address'
              value={formValues.wallet_address}
              onChange={onInputChange}
              errorMessage={formErrors.wallet_address}
              required={true}
            />

            <div className='dialogActions'>
              <button autoFocus type='submit' className='actionButton'>
                Add
              </button>
              <button autoFocus onClick={handleClose} className='cancelButton'>
                Cancel
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

const CustomMetaMaskModalTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2, fontSize: 18, fontWeight: 'bold' }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

CustomMetaMaskModalTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default CustomMetaMaskModal;

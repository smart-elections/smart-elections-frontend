import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';

import Dialog from '@mui/material/Dialog';
import './candidateProfileModal.scss';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '25px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
    width: '700px',
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

CustomModalTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const CandidateProfileModal = ({
  open,
  handleClose,
  candidateDetails: { imageUrl, name, dateOfBirth, party, biography },
}) => {
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <CustomModalTitle id='customized-dialog-title' onClose={handleClose}>
          {name}
        </CustomModalTitle>

        <DialogContent dividers>
          <div className='candidate-profile-modal__content-container'>
            <div className='candidate-profile-modal__image-container'>
              <img src={imageUrl} alt={name} title={name} />
            </div>
            <div className='candidate-profile-modal__details-container'>
              <Typography variant='h6'>
                <span>Name: </span>
                {name}
              </Typography>
              <Typography variant='body1'>
                <span>Party: </span>
                {party}
              </Typography>
              <Typography variant='body1'>
                <span>Date of Birth: </span>
                {dateOfBirth}
              </Typography>
            </div>
          </div>

          <div className='candidate-profile-modal__biography-container'>
            <Typography gutterBottom>
              <span>Biography: </span>
              <p className='biography-text'>{biography}</p>
            </Typography>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default CandidateProfileModal;

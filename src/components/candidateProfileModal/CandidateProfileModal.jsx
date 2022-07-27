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
import moment from 'moment';

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
  candidateDetails: {
    citizen_firstname,
    citizen_lastname,
    candidate_party,
    citizen_yob,
  },
}) => {
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <CustomModalTitle id='customized-dialog-title' onClose={handleClose}>
          {citizen_firstname + ' ' + citizen_lastname}
        </CustomModalTitle>

        <DialogContent dividers>
          <div className='candidate-profile-modal__content-container'>
            <div className='candidate-profile-modal__image-container'>
              <img
                src={`https://via.placeholder.com/150?text=${citizen_firstname}`}
                alt={citizen_firstname + ' ' + citizen_lastname}
                title={citizen_firstname + ' ' + citizen_lastname}
              />
            </div>
            <div className='candidate-profile-modal__details-container'>
              <Typography variant='h6'>
                <span>Name: </span>
                {citizen_firstname + ' ' + citizen_lastname}
              </Typography>
              <Typography variant='body1'>
                <span>Party: </span>
                {candidate_party}
              </Typography>
              <Typography variant='body1'>
                <span>Age: </span>
                {moment().diff(citizen_yob.slice(0, 10), 'years')}
              </Typography>
            </div>
          </div>

          <div className='candidate-profile-modal__biography-container'>
            <Typography gutterBottom>
              <span>Biography: </span>
              <p className='biography-text'>{'biography'}</p>
            </Typography>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default CandidateProfileModal;

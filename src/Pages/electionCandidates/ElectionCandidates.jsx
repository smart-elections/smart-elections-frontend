import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './electionCandidates.scss';

// components
import CandidateCard from '../../components/candidateComponent/candidateCard.jsx';
import CandidateProfileModal from '../../components/candidateProfileModal/CandidateProfileModal.jsx';

// services
import { getElectionCandidates } from '../../services/candidates.services';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

const ElectionCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState({});
  const [loadingCandidates, setLoadingCandidates] = useState(true);

  const { electionYear, electionRound, electionType } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      const { data } = await getElectionCandidates(
        electionYear,
        electionType,
        electionRound
      );
      setCandidates(data);
      if (data.length > 0) {
        setLoadingCandidates(false);
      }
    })();
  }, [electionRound, electionType, electionYear]);

  const openCandidateModal = (candidate) => {
    setOpen(true);
    setSelectedCandidate(candidate);
  };

  return (
    <>
      {open && (
        <CandidateProfileModal
          candidateDetails={selectedCandidate}
          open={open}
          handleClose={handleClose}
        />
      )}
      <div role='presentation' style={{ marginLeft: '10px' }}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Typography
            className='breadCrumb-typography'
            onClick={() => navigate(-1)}
          >
            Elections
          </Typography>
          <Typography color='text.primary'>
            {electionRound === 1 ? '1st' : '2nd'}{' '}
            {electionType === 1
              ? 'Presidential'
              : electionType === 2
              ? 'Legislative'
              : 'Local'}
            {' election - '}
            {electionYear}
          </Typography>
        </Breadcrumbs>
      </div>
      <div className='candidatesContainer'>
        {!loadingCandidates ? (
          candidates?.map((candidate) => (
            <CandidateCard
              key={candidate.candidate_id}
              imageUrl={
                candidate.candidate_image ||
                `https://via.placeholder.com/150?text=${candidate.citizen_firstname}`
              }
              buttonAction={openCandidateModal.bind(this, candidate)}
              name={
                candidate.citizen_firstname + ' ' + candidate.citizen_lastname
              }
              party={candidate.candidate_party}
              buttonText='View'
            />
          ))
        ) : (
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span>No candidates are registered!</span>
          </div>
        )}
      </div>
    </>
  );
};

export default ElectionCandidates;

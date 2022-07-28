import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './candidates.scss';
import CandidateCard from '../../components/candidateComponent/candidateCard.jsx';
import CandidateProfileModal from '../../components/candidateProfileModal/CandidateProfileModal.jsx';

// services
import { getElectionCandidates } from '../../services/candidates.services';

import Divider from '@mui/material/Divider';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

const Candidates = () => {
  const [latestElections, setLatestElections] = useState([]);

  const [selectedElection, setSelectedElection] = useState('');
  const [electionCandidates, setElectionCandidates] = useState([]);
  const [loadingCandidates, setLoadingCandidates] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState({});

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const openCandidateModal = (candidate) => {
    console.log(candidate);
    setOpen(true);
    setSelectedCandidate(candidate);
  };

  useEffect(() => {
    const fetchElectionsData = async () => {
      const {
        data: { data },
      } = await axios(`/elections?end='${today}'`);
      setLatestElections(data);
      setSelectedElection(
        `year=${data[0].election_year}&round=${data[0].election_round}&type=${data[0].election_type}`
      );

      const candidateResponse = await getElectionCandidates(
        data[0].election_year,
        data[0].election_type,
        data[0].election_round
      );

      setElectionCandidates(candidateResponse.data);
      setLoadingCandidates(false);
    };
    fetchElectionsData();
  }, []);

  const onElectionChange = async (e) => {
    console.log(e.target.value);

    setSelectedElection(e.target.value);

    const [year, round, type] = e.target.value.split('&');

    setLoadingCandidates(true);

    const candidateResponse = await getElectionCandidates(
      year.substring(year.indexOf('=') + 1),
      type.substring(type.indexOf('=') + 1),
      round.substring(round.indexOf('=') + 1)
    );

    console.log(candidateResponse.data);
    setElectionCandidates(candidateResponse.data);
    setLoadingCandidates(false);
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
      <div>
        <div className='electionSelectContainer'>
          <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
              <InputLabel id='selectedElection-label'>Election</InputLabel>
              <Select
                labelId='selectedElection-label'
                id='selectedElection'
                label='Election'
                value={selectedElection}
                onChange={onElectionChange}
              >
                {latestElections.map((election) => {
                  return (
                    <MenuItem
                      key={election.election_id}
                      value={`year=${election.election_year}&round=${election.election_round}&type=${election.election_type}`}
                    >
                      {election.election_type === 1
                        ? 'Presidential'
                        : election.election_type === 2
                        ? 'Legislative'
                        : 'Local'}{' '}
                      {election.election_year}{' '}
                      {election.election_round === 1 ? '1st' : '2nd'}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </div>

        <Divider />

        <div className='candidatesContainer'>
          {!loadingCandidates ? (
            electionCandidates.length > 0 ? (
              electionCandidates?.map((candidate) => (
                <CandidateCard
                  key={candidate.candidate_id}
                  imageUrl={
                    candidate.candidate_image ||
                    `https://via.placeholder.com/150?text=${candidate.citizen_firstname}`
                  }
                  buttonAction={openCandidateModal.bind(this, candidate)}
                  name={
                    candidate.citizen_firstname +
                    ' ' +
                    candidate.citizen_lastname
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
                  marginTop: '20px',
                }}
              >
                <span>No candidates are registered for this election!</span>
              </div>
            )
          ) : (
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </div>
      </div>
    </>
  );
};

export default Candidates;

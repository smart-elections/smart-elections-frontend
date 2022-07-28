import { useState, useEffect } from 'react';
import './electionVoting.scss';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';

import { smartElectionsContractAddress } from '../../config.js';
import smartElectionsApplicationContract from '../../services/smartElectionsApplicationContract.json';

import useAppStateContext from '../../hooks/useAppStateContext';

import {
  getElectionCandidates,
  connectWallet,
} from '../../services/elections.services';
import CandidateCard from '../../components/candidateComponent/candidateCard.jsx';

const ElectionVoting = () => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [electionCandidates, setElectionCandidates] = useState([]);

  const {
    appState: { user },
  } = useAppStateContext();

  console.log('user', user);

  const { electionYear, electionRound, electionType } = useParams();
  console.log(electionYear, electionRound, electionType);

  useEffect(() => {
    connectWallet(setCorrectNetwork, correctNetwork, setCurrentAccount);
    console.log(currentAccount);
  }, [correctNetwork, currentAccount]);

  useEffect(() => {
    const fetchedElections = async () => {
      const { data } = await getElectionCandidates(
        electionYear,
        electionType,
        electionRound
      );
      setElectionCandidates(data);
      console.log(data);
    };
    fetchedElections();
  }, [electionRound, electionType, electionYear]);

  const castVote = async (candidate_id) => {
    // username is metamask address
    let vote = {
      username: currentAccount,
      citizen_ssn: user.citizen_ssn,
      citizen_nationality: user.citizen_nationality,
      election_year: parseInt(electionYear),
      election_round: parseInt(electionRound),
      election_type: parseInt(electionType),
      candidate_id: candidate_id,
    };

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const smartElectionsContract = new ethers.Contract(
          smartElectionsContractAddress,
          smartElectionsApplicationContract.abi,
          signer
        );

        await smartElectionsContract.addVote(
          vote.citizen_ssn,
          vote.citizen_nationality,
          vote.election_year,
          vote.election_round,
          vote.election_type,
          vote.candidate_id
        );

        toast.success('Your vote has been cast');
      } else {
        console.error("Ethereum object doesn't exist!");
      }
    } catch (error) {
      toast.error('Error casting your vote');
      console.error('Error casting your vote', error);
    }
  };

  const onVoteHandler = async ({ candidate_id }) => {
    console.log('Voting for', candidate_id);
    if (
      currentAccount === '' ||
      currentAccount === null ||
      correctNetwork === false
    ) {
      toast.warning('Please connect to Metamask');
      connectWallet();
    } else {
      // check if account is already voted (inside registered_voters db table)
      // if not, vote
      // if yes, toast message

      castVote(candidate_id); // Sending vote transaction to blockchain
    }
  };

  return (
    <>
      <div className='candidatesContainer'>
        {electionCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.candidate_id}
            imageUrl={`https://via.placeholder.com/150?text=${candidate.citizen_firstname}`}
            buttonAction={onVoteHandler.bind(this, candidate)}
            name={`${candidate.citizen_firstname} ${candidate.citizen_lastname}`}
            party={candidate.candidate_party}
            buttonText={'Vote'}
          />
        ))}
      </div>
    </>
  );
};

export default ElectionVoting;

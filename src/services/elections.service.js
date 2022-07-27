import axios from 'axios';
import { toast } from 'react-toastify';

export const getElections = async () => {
  try {
    const response = await axios.get('/elections');

    return response.data;
  } catch (error) {
    console.error('Error getting elections: ', error);
  }
};

export const getElectionCandidates = async (
  electionYear,
  electionType,
  electionRound
) => {
  try {
    const response = await axios.get(
      `/elections/candidates?year=${electionYear}&type=${electionType}&round=${electionRound}`
    );
    toast.success('Election candidates fetched fetched successfully');

    return response.data;
  } catch (error) {
    console.error('Error getting elections: ', error);
  }
};

export const getElectionWinner = async (
  electionYear,
  electionType,
  electionRound
) => {
  try {
    const response = await axios.get(
      `analytics/election_winner?year=${electionYear}&type=${electionType}&round=${electionRound}`
    );

    return response;
  } catch (error) {
    console.error('Error getting election winner: ', error);
  }
};

import axios from 'axios';

export const getElectionCandidates = async (
  electionYear,
  electionType,
  electionRound
) => {
  try {
    const response = await axios.get(
      `/elections/candidates?year=${electionYear}&type=${electionType}&round=${electionRound}`
    );

    return response.data;
  } catch (error) {
    console.error('Error getting elections candidates: ', error);
  }
};

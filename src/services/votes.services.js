import axios from 'axios';
import { toast } from 'react-toastify';

export const registerVoterForElection = async (body) => {
  await axios
    .post('/voters/add/voter', body)
    .then((response) => {
      if (response.status === 200) {
        toast.success('You have registered for election voting successfully');
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const addVoteToElection = async (body, navigate) => {
  console.log(body);

  await axios
    .post('/votes/add/vote', body)
    .then((response) => {
      if (response.status === 200) {
        console.log('Congratulations! You have voted successfully');
        navigate(
          `/elections/candidates/${body.election_year}/${body.election_round}/${body.election_type}`
        );
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

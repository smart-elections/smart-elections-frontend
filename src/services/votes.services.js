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
      console.error('Login form: There was an error!', error);
    });
};

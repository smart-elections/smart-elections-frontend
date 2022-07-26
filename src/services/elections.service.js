import axios from 'axios';
import { toast } from 'react-toastify';

export const getElections = async (dispatch) => {
  try {
    const response = await axios.get('/elections/');
    console.log(response);
    toast.success('Elections fetched successfully');
    // dispatch({
    //   type: 'GetElections',
    //   payload: response.data.data,
    // });

    return response.data;
  } catch (error) {
    console.error('Error getting elections: ', error);
  }
};

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

// MetaMask functions
// Calls Metamask to connect wallet on clicking Connect Wallet button
export const connectWallet = async (
  setCorrectNetwork,
  correctNetwork,
  setCurrentAccount
) => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      toast.error('Metamask not detected');
      return;
    }

    checkCorrectNetwork(setCorrectNetwork);

    if (correctNetwork) {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setCurrentAccount(accounts[0]);
    } else {
      return;
    }
  } catch (error) {
    console.log('Error connecting to metamask', error);
  }
};

// Checks if wallet is connected to the goerli network
export const checkCorrectNetwork = async (setCorrectNetwork) => {
  const { ethereum } = window;
  let chainId = await ethereum.request({ method: 'eth_chainId' });

  const goerliChainId = '0x5';

  if (chainId !== goerliChainId) {
    toast.error('You are not connected to the Goerli Testnet!');
    setCorrectNetwork(false);
  } else {
    toast.success('You are connected to the Goerli Testnet!');
    setCorrectNetwork(true);
  }
};

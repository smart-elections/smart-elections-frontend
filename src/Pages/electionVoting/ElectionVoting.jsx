import { useState, useEffect } from 'react';
import './electionVoting.scss';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';

import { smartElectionsContractAddress } from '../../config.js';
import smartElectionsApplicationContract from '../../services/smartElectionsApplicationContract.json';

const ElectionVoting = () => {
  const [error, setError] = useState(null);
  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        toast.error('Metamask not detected');
        return;
      }

      checkCorrectNetwork();

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
  const checkCorrectNetwork = async () => {
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

  useEffect(() => {
    connectWallet();
    console.log(currentAccount);
  });

  const castVote = async () => {
    let vote = {
      election_year: '',
      election_type: '',
      election_round: '',
      citizen_ssn: '',
      citizen_nationality: '',
      candidate_id: '',
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

        await smartElectionsContract.createTweet(
          vote.election_year,
          vote.election_type,
          vote.election_round,
          vote.citizen_ssn,
          vote.citizen_nationality,
          vote.candidate_id
        );
      } else {
        console.error("Ethereum object doesn't exist!");
      }
    } catch (error) {
      toast.error('Error casting your vote');
      console.error('Error casting your vote', error);
    }
  };

  const onVoteSubmitHandler = async (e) => {
    e.preventDefault();
    console.log('Submitting');
    if (
      currentAccount === '' ||
      currentAccount === null ||
      correctNetwork === false
    ) {
      toast.warning('Please connect to Metamask');
      connectWallet();
    } else {
      // check if account is already voted
      // if not, vote
      // if yes, toast message
      // toast.success('Your vote has been cast');
      // TODO: Send transaction to blockchain
      castVote();
    }
  };

  return <div>ElectionVoting</div>;
};

export default ElectionVoting;

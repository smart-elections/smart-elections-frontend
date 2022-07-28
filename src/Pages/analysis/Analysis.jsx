import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AnalyticsCard from '../../components/analyticsComponent/AnalyticsCard.jsx';
import './analysis.scss';

import Divider from '@mui/material/Divider';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import BarChart from '../../components/analyticsComponent/BarChart.js';

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

const Analysis = () => {
  const [latestElections, setLatestElections] = useState([]);

  const [selectedElection, setSelectedElection] = useState('');

  const [
    selectedElectionRegisteredVoters,
    setSelectedElectionRegisteredVoters,
  ] = useState(0);
  const [
    selectedElectionRegisteredVotersPercentage,
    setSelectedElectionRegisteredVotersPercentage,
  ] = useState(0);

  const [selectedElectionVoters, setSelectedElectionVoters] = useState(0);
  const [
    selectedElectionVotersPercentage,
    setSelectedElectionVotersPercentage,
  ] = useState(0);

  const [selectedElectionWinner, setSelectedElectionWinner] = useState('');
  const [selectedElectionWinnerVotes, setSelectedElectionWinnerVotes] =
    useState(0);
  const [
    selectedElectionWinnerPercentage,
    setSelectedElectionWinnerPercentage,
  ] = useState(0);
  const [selectedElectionWinnerParty, setSelectedElectionWinnerParty] =
    useState('');
  const [selectedElectionWinnerImage, setSelectedElectionWinnerImage] =
    useState('');

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchElectionsData = async () => {
      const {
        data: { data },
      } = await axios(`/elections?end='${today}'`);
      setLatestElections(data);
      setSelectedElection(
        `year=${data[0].election_year}&round=${data[0].election_round}&type=${data[0].election_type}`
      );

      const fetchRegisteredData = async () => {
        const response1 = await axios(
          `/analytics/registered_voters?year=${data[0].election_year}&round=${data[0].election_round}&type=${data[0].election_type}`
        );
        setSelectedElectionRegisteredVoters(response1.data.registered_voters);
        setSelectedElectionRegisteredVotersPercentage(
          response1.data.lastElectionDifference
        );
      };
      fetchRegisteredData();

      const fetchVotesData = async () => {
        const response2 = await axios(
          `/analytics/voters?year=${data[0].election_year}&round=${data[0].election_round}&type=${data[0].election_type}`
        );
        setSelectedElectionVoters(response2.data.voters);
        setSelectedElectionVotersPercentage(
          response2.data.lastElectionDifference
        );
      };
      fetchVotesData();

      const fetchWinnerData = async () => {
        const response3 = await axios(
          `/analytics/election_winner?year=${data[0].election_year}&round=${data[0].election_round}&type=${data[0].election_type}`
        );
        setSelectedElectionWinner(
          response3.data.winner.citizen_firstname +
            ' ' +
            response3.data.winner.citizen_lastname
        );
        setSelectedElectionWinnerVotes(response3.data.winner.votes);
        setSelectedElectionWinnerPercentage(response3.data.percentage);
        setSelectedElectionWinnerParty(response3.data.winner.candidate_party);
        setSelectedElectionWinnerImage(response3.data.winner.candidate_image);
      };
      fetchWinnerData();

      const fetchChartData = async () => {
        const response4 = await axios(
          `/analytics/election_winner?year=${data[0].election_year}&round=${data[0].election_round}&type=${data[0].election_type}`
        );
        setChartData(response4.data.results);
      };
      fetchChartData();
    };
    fetchElectionsData();
  }, []);

  const onElectionChange = async (e) => {
    setSelectedElection(e.target.value);

    let response = await axios(
      `/analytics/registered_voters?${e.target.value}`
    );

    setSelectedElectionRegisteredVoters(response.data.registered_voters);
    setSelectedElectionRegisteredVotersPercentage(
      response.data.lastElectionDifference
    );

    let response2 = await axios(`/analytics/voters?${e.target.value}`);

    setSelectedElectionVoters(response2.data.voters);
    setSelectedElectionVotersPercentage(response2.data.lastElectionDifference);

    let response3 = await axios(`/analytics/election_winner?${e.target.value}`);

    setSelectedElectionWinner(
      response3.data.winner.citizen_firstname +
        ' ' +
        response3.data.winner.citizen_lastname
    );
    setSelectedElectionWinnerVotes(response3.data.winner.votes);
    setSelectedElectionWinnerPercentage(response3.data.percentage);
    setSelectedElectionWinnerParty(response3.data.winner.candidate_party);
    setSelectedElectionWinnerImage(response3.data.winner.candidate_image);

    let response4 = await axios(`/analytics/election_winner?${e.target.value}`);

    setChartData(response4.data.results);
  };

  return (
    <div className='analysis__container'>
      <div className='electionSelectContainer' style={{ paddingRight: '25px' }}>
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
      <div className='analysis__component'>
        <div className='analysis__component__left'>
          <div className='analysis__component__left__upper'>
            <div className='analysis__component__left__upper--registered'>
              <AnalyticsCard
                title='Number of Registered Voters'
                number={selectedElectionRegisteredVoters}
                percentage={selectedElectionRegisteredVotersPercentage}
                color='white'
              />
            </div>
            <div className='analysis__component__left__upper--voters'>
              <AnalyticsCard
                title='Number of Voters'
                number={selectedElectionVoters}
                percentage={selectedElectionVotersPercentage}
                color='white'
              />
            </div>
          </div>
          <div className='analysis__component__left__lower'>
            <div className='analysis__component__left__lower--graph'>
              <BarChart data={chartData} />
            </div>
          </div>
        </div>
        <div className='analysis__component__right'>
          <div className='analysis__component__right--winner'>
            <div className='winner__card'>
              <div className='winner__card__text--box'>
                <div className='winner__card__title'>Winner</div>
                <div className='winner__card__name'>
                  {selectedElectionWinner}
                </div>
                <div className='winner__card__party'>
                  {selectedElectionWinnerParty}
                </div>
              </div>
              <div className='winner__card__image--box'>
                <img
                  className='winner__card__image'
                  src={selectedElectionWinnerImage}
                  alt='winner'
                />
              </div>
            </div>
          </div>
          <div className='analysis__component__right--winnerVotes'>
            <AnalyticsCard
              title='Winner Votes'
              number={selectedElectionWinnerVotes}
              percentage={selectedElectionWinnerPercentage}
              color='green'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;

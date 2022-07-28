import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './electionAnalytics.scss';
import axios from 'axios';

// Components
import AnalyticsCard from '../../components/analyticsComponent/AnalyticsCard.jsx';
import BarChart from '../../components/analyticsComponent/BarChart.js';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

const ElectionAnalytics = () => {
  const { electionYear, electionRound, electionType } = useParams();
  const navigate = useNavigate();

  let electionQuery = `?year=${electionYear}&round=${electionRound}&type=${electionType}`;

  console.log(electionYear, electionRound, electionType);

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
      const fetchRegisteredData = async () => {
        const response1 = await axios(
          `/analytics/registered_voters${electionQuery}`
        );
        setSelectedElectionRegisteredVoters(response1.data.registered_voters);
        setSelectedElectionRegisteredVotersPercentage(
          response1.data.lastElectionDifference
        );

        console.log(response1.data);
      };
      fetchRegisteredData();

      const fetchVotesData = async () => {
        const response2 = await axios(`/analytics/voters${electionQuery}`);
        setSelectedElectionVoters(response2.data.voters);
        setSelectedElectionVotersPercentage(
          response2.data.lastElectionDifference
        );
        console.log(response2.data);
      };
      fetchVotesData();

      const fetchWinnerData = async () => {
        const response3 = await axios(
          `/analytics/election_winner${electionQuery}`
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
          `/analytics/election_winner${electionQuery}`
        );
        setChartData(response4.data.results);
      };
      fetchChartData();
    };
    fetchElectionsData();
  }, [electionQuery]);

  return (
    <div className='analysis__container'>
      <div role='presentation' style={{ marginLeft: '30px' }}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Typography
            className='breadCrumb-typography'
            onClick={() => navigate(-1)}
          >
            Elections
          </Typography>
          <Typography color='text.primary'>
            {electionRound === 1 ? '1st' : '2nd'}{' '}
            {electionType === 1
              ? 'Presidential'
              : electionType === 2
              ? 'Legislative'
              : 'Local'}
            {' election - '}
            {electionYear}
          </Typography>
        </Breadcrumbs>
      </div>
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

export default ElectionAnalytics;

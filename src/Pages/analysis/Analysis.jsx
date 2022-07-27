import React, { useState, useEffect } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';

import AnalyticsCard from '../../components/analyticsComponent/AnalyticsCard.jsx';
import './analysis.scss';

const baseUrl = 'http://ec2-44-202-30-87.compute-1.amazonaws.com:8000';

const Analysis = () => {

  const [latestElections, setLatestElections] = useState([]);

  const [selectedElection, setSelectedElection] = useState('');

  const [selectedElectionRegisteredVoters, setSelectedElectionRegisteredVoters] = useState(0);
  const [selectedElectionRegisteredVotersPercentage, setSelectedElectionRegisteredVotersPercentage] = useState(0);

  const [selectedElectionVoters, setSelectedElectionVoters] = useState(0);
  const [selectedElectionVotersPercentage, setSelectedElectionVotersPercentage] = useState(0);

  const [selectedElectionWinner, setSelectedElectionWinner] = useState('');

  useEffect(() => {
    const fetchElectionsData = async () => {
      const { data: { data } } = await axios(`${baseUrl}/elections`);
      setLatestElections(data);
      setSelectedElection(`year=${data[0].election_year}&round=${data[0].election_round}&type=${data[0].election_type}`);

      console.log('1st', `year=${data[0].election_year}&round=${data[0].election_round}&type=${data[0].election_type}`)

      const fetchRegisteredData = async () => {
        const response1 = await axios(`${baseUrl}/analytics/registered_voters?year=${data[0].election_year}&round=${data[0].election_round}&type=${data[0].election_type}`);
        setSelectedElectionRegisteredVoters(response1.data.registered_voters);
        setSelectedElectionRegisteredVotersPercentage(response1.data.lastElectionDifference);

        console.log(response1.data);
      }
      fetchRegisteredData();

      const fetchVotesData = async () => {
        const response2 = await axios(`${baseUrl}/analytics/voters?year=${data[0].election_year}&round=${data[0].election_round}&type=${data[0].election_type}`);
        setSelectedElectionVoters(response2.data.voters);
        setSelectedElectionVotersPercentage(response2.data.lastElectionDifference);
        console.log(response2.data);
      }
      fetchVotesData();

    }
    fetchElectionsData();
  }, []);


  const onElectionChange = async (e) => {
    console.log(e.target.value);

    let response = await axios(`${baseUrl}/analytics/registered_voters?${e.target.value}`);

    console.log('on election change', response.data);

    setSelectedElectionRegisteredVoters(response.data.registered_voters);
    setSelectedElectionRegisteredVotersPercentage(response.data.lastElectionDifference);

    let response2 = await axios(`${baseUrl}/analytics/voters?${e.target.value}`);

    setSelectedElectionVoters(response2.data.voters);
    setSelectedElectionVotersPercentage(response2.data.lastElectionDifference);
  }

  return (
    <div className='analysis__container'>
      <div className='selectInput'>
        <div className='selectBox'>
          <FilterListIcon className='icon' />
          <select
            className='select'
            aria-label='Election select'
            id='selectedElection'
            name='selected_election'
            onChange={onElectionChange}
            required
          >
            {latestElections.map((election) => {
              return (
                <option key={election.election_id}
                  value={`year=${election.election_year}&type=${election.election_type}&round=${election.election_round}`}>
                  {election.election_type === 1 ? 'Presidential' : election.election_type === 2 ? 'Legislative' : 'Local'} {election.election_year} {election.election_round === 1 ? '1st' : '2nd'}
                </option>
              )
            }
            )}
          </select>
        </div>
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
              Graph here
            </div>
          </div>
        </div>
        <div className='analysis__component__right'>
          <div className='analysis__component__right--winner'>
            <div className='winner__card'>
              <div className='winner__card__text--box'>
                <div className='winner__card__title'>
                  Winner
                </div>
                <div className='winner__card__name'>
                  Emmanuel Macron
                </div>
                <div className='winner__card__party'>
                  La République en Marche!
                </div>
              </div>
              <div className='winner__card__image--box'>
                <img className='winner__card__image' src='https://pngimage.net/wp-content/uploads/2018/06/macron-png-7.png' alt='winner' />
              </div>
            </div>
          </div>
          <div className='analysis__component__right--winnerVotes'>
            <AnalyticsCard
              title='Winner Votes'
              number={selectedElectionRegisteredVoters}
              percentage={selectedElectionRegisteredVotersPercentage}
              color='green'
            />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Analysis;

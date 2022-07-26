import React, { useState, useEffect } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import axios from 'axios';

import AnalyticsCard from '../../components/analyticsComponent/AnalyticsCard.jsx';
import './analysis.scss';

const baseUrl = 'http://ec2-34-207-166-28.compute-1.amazonaws.com:8000';

const Analysis = () => {

  const [latestElections, setLatestElections] = useState([]);

  const [selectedElection, setSelectedElection] = useState('');

  const [selectedElectionType, setSelectedElectionType] = useState('');

  const [selectedElectionRound, setSelectedElectionRound] = useState('');

  const [selectedElectionYear, setSelectedElectionYear] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data: { data } } = await axios(`${baseUrl}/elections`);
      setLatestElections(data);

      setSelectedElection(`year=${data[0].election_year}&type=${data[0].election_type}&round=${data[0].election_round}`);
      // api calls

      setSelectedElectionType(data[0].election_type);
      setSelectedElectionRound(data[0].election_round);
      setSelectedElectionYear(data[0].election_year);

      console.log(data)
    }
    fetchData();
  }, []);

  const onFilterChange = (e) => {
    setSelectedElection(e.target.value);
    setSelectedElectionYear(e.target.value.split('&')[0].split('=')[1]);
    setSelectedElectionType(e.target.value.split('&')[1].split('=')[1]);
    setSelectedElectionRound(e.target.value.split('&')[2].split('=')[1]);
    console.log('e', e.target.value)
  }

  useEffect(() => {
    console.log(selectedElection);
    console.log('type', selectedElectionType);
    console.log('round', selectedElectionRound);
    console.log('year', selectedElectionYear);
    // call all apis
  }, [selectedElection, selectedElectionType, selectedElectionRound, selectedElectionYear]);


  // console.log(latestElections);

  // const [electionWinner, setElectionWinner] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log(selectedElections);
  //     const result = await axios(`${baseUrl}/analytics/election_winner?${selectedElections}`);
  //     setElectionWinner(result.data.data);
  //   }
  //   fetchData();
  //   console.log(electionWinner);
  // }
  //   , [selectedElections]);

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
            onChange={onFilterChange}
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
                currentElectionsYear={selectedElectionYear}
                electionsType={selectedElectionType}
                electionsRound={selectedElectionRound}
              />
            </div>
            <div className='analysis__component__left__upper--voters'>
              <AnalyticsCard
                title='Number of Voters'
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
              <div className='winner__card__title'>
                Winner
              </div>
              <div className='winner__card__name'>
                {/* {latestElections.election_type === 1 ? 'President' : 'Senator'} */}
              </div>
            </div>
          </div>
          <div className='analysis__component__right--winnerVotes'>
            <div className='winnerVotes__card'>
              fdfdf
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Analysis;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import './elections.scss';
import { getElections } from '../../services/elections.services';
import { registerVoterForElection } from '../../services/votes.services';

import useAppStateContext from '../../hooks/useAppStateContext';

const Elections = () => {
  const [elections, setElections] = useState([]);
  const [isElectionLoading, setIsElectionLoading] = useState(true);
  const [isUserRegisteredInElection, setIsUserRegisteredInElection] = useState(
    {}
  );
  const navigate = useNavigate();

  const {
    appState: { user },
  } = useAppStateContext();

  useEffect(() => {
    const fetchedElections = async () => {
      const { data } = await getElections();
      setElections(
        data.sort((a, b) => {
          return b.election_year - a.election_year;
        })
      );
      console.log(data);
      setIsElectionLoading(false);
    };
    fetchedElections();
  }, []);

  useEffect(() => {
    if (!isElectionLoading) {
      let userRegisteredElections = {};
      for (let i = 0; i < elections.length; i++) {
        const {
          election_year,
          election_type,
          election_round,
          election_start,
          election_end,
        } = elections[i];

        (async () => {
          const {
            data: { data },
          } = await axios(
            `/voters?ssn=${user.citizen_ssn}&nationality=${user.citizen_nationality}&year=${election_year}&type=${election_type}&round=${election_round}`
          );

          if (new Date().toISOString() < election_start) {
            if (data.length === 0) {
              setIsUserRegisteredInElection(
                (oldIsUserRegisteredInElection) => ({
                  ...oldIsUserRegisteredInElection,
                  [`${election_year}-${election_type}-${election_round}`]: false,
                })
              );
            } else {
              setIsUserRegisteredInElection(
                (oldIsUserRegisteredInElection) => ({
                  ...oldIsUserRegisteredInElection,
                  [`${election_year}-${election_type}-${election_round}`]: true,
                })
              );
            }
          } else {
            setIsUserRegisteredInElection((oldIsUserRegisteredInElection) => ({
              ...oldIsUserRegisteredInElection,
              [`${election_year}-${election_type}-${election_round}`]: true,
            }));
          }
        })();
      }

      setIsUserRegisteredInElection(userRegisteredElections);
    }
  }, [
    elections,
    isElectionLoading,
    user.citizen_nationality,
    user.citizen_ssn,
  ]);

  const registerForVoting = async (
    election_year,
    election_type,
    election_round
  ) => {
    const body = {
      election_year,
      election_type,
      election_round,
      citizen_ssn: user.citizen_ssn,
      citizen_nationality: user.citizen_nationality,
    };

    await registerVoterForElection(body);

    setIsUserRegisteredInElection((oldIsUserRegisteredInElection) => ({
      ...oldIsUserRegisteredInElection,
      [`${election_year}-${election_type}-${election_round}`]: true,
    }));
  };

  const electionVotingAction = (from, to, current) => {
    let startDate, endDate, currentDate;
    startDate = Date.parse(from);
    endDate = Date.parse(to);
    currentDate = Date.parse(current);

    if (currentDate <= endDate && currentDate >= startDate) return 'Cast Vote';
    else if (currentDate < startDate) return 'View Candidates';
    else if (currentDate > endDate) return 'View Results';
  };

  return (
    <>
      <div className='table-container'>
        <table className='custom-table' cellSpacing='0'>
          <thead>
            <tr>
              <th scope='col'>Year</th>
              <th scope='col'>Type</th>
              <th scope='col'>Round</th>
              <th scope='col'>Start Date</th>
              <th scope='col'>End Date</th>
              <th scope='col' style={{ textAlign: 'center' }}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {elections.map(
              (
                {
                  election_id,
                  election_year,
                  election_type,
                  election_round,
                  election_start,
                  election_end,
                },
                index
              ) => {
                const votingAction = electionVotingAction(
                  election_start,
                  election_end,
                  new Date().toISOString()
                );

                let navigationDestination = '';
                let votingActionHoverClassName = '';
                if (votingAction === 'Cast Vote') {
                  navigationDestination = `voting/${election_year}/${election_round}/${election_type}`;
                  votingActionHoverClassName = 'cast-vote-hover';
                } else if (votingAction === 'View Candidates') {
                  navigationDestination = `candidates/${election_year}/${election_round}/${election_type}`;
                  votingActionHoverClassName = 'view-candidates-hover';
                } else if (votingAction === 'View Results') {
                  navigationDestination = `analytics/${election_year}/${election_round}/${election_type}`;
                  votingActionHoverClassName = 'view-results-hover';
                }

                return (
                  <>
                    <tr
                      className='spacer'
                      key={
                        index + election_year + election_type + election_round
                      }
                    >
                      <td colSpan='100'></td>
                    </tr>

                    <tr key={election_id}>
                      <td>{election_year}</td>
                      <td>
                        {election_type === 1
                          ? 'Presidential'
                          : election_type === 2
                          ? 'Parliamentary'
                          : 'Local'}
                      </td>
                      <td>
                        {election_round === 1
                          ? '1st'
                          : election_round === 2
                          ? '2nd'
                          : null}
                      </td>
                      <td>
                        {moment(`${election_start}`).format('MMMM Do, YYYY')}
                      </td>
                      <td>
                        {moment(`${election_end}`).format('MMMM Do, YYYY')}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {isUserRegisteredInElection[
                          `${election_year}-${election_type}-${election_round}`
                        ] === true ? (
                          <button
                            className={`voting-action ${votingActionHoverClassName}`}
                            onClick={() => {
                              navigate(navigationDestination);
                            }}
                          >
                            {votingAction}
                          </button>
                        ) : (
                          <button
                            className={`voting-action register-for-voting-hover`}
                            onClick={() =>
                              registerForVoting(
                                election_year,
                                election_type,
                                election_round
                              )
                            }
                          >
                            Register
                          </button>
                        )}
                      </td>
                    </tr>
                  </>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Elections;

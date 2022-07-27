import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './elections.scss';
import moment from 'moment';
import { getElections } from '../../services/elections.service';

const Elections = () => {
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedElections = async () => {
      const { data } = await getElections();
      setElections(
        data.sort((a, b) => {
          return b.election_year - a.election_year;
        })
      );
      console.log(data);
    };
    fetchedElections();
  }, []);

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
                    <tr className='spacer' key={index}>
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
                      <td>{moment(`${election_start}`).format('MMMM Do')}</td>
                      <td>{moment(`${election_end}`).format('MMMM Do')}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className={`voting-action ${votingActionHoverClassName}`}
                          onClick={() => {
                            navigate(navigationDestination);
                          }}
                        >
                          {votingAction}
                        </button>
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

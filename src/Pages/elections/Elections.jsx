import { useState, useEffect } from 'react';
import './elections.scss';

import { getElections } from '../../services/elections.service';

const ElectionsList = ({ electionsData }) => {
  console.log(electionsData);
  return (
    <>
      {electionsData.map(
        ({
          election_id,
          election_start,
          election_end,
          election_type,
          election_round,
          election_year,
        }) => (
          <div className='elections__card' key={election_id}>
            <div className='card_info'>
              <p className='elections__year'>{election_year}</p>
              <p className='elections__type'>{election_type}</p>
              <p className='elections__round'>{election_round}</p>
              <p className='elections__winner'>empty/null</p>
              <p className='elections__date'>{election_start}</p>
              <div className='elections__button_box'>
                <button
                  type='submit'
                  // className={
                  //   elections.completed
                  //     ? 'elections__button__completed'
                  //     : 'elections__button__pending'
                  // }
                  className='elections__button__pending'
                >
                  View
                  {/* {elections.completed ? 'View' : 'Vote'} */}
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

const Elections = () => {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const fetchedElections = async () => {
      const { data } = await getElections();
      setElections(data);
      console.log(data);
    };
    fetchedElections();
  }, []);

  return (
    <>
      <div className='elections__block'>
        <div className='elections__card__header'>
          <div className='card_info'>
            <p className='elections__year__title'>Year</p>
            <p className='elections__type__title'>Type</p>
            <p className='elections__round__title'>Round</p>
            <p className='elections__winner__title'>Winner</p>
            <p className='elections__date__title'>Start Date</p>
            <p className='elections__blank__title'></p>
          </div>
        </div>
        <div className='elections__container' id='style-scrollbar'>
          <div className='main_content'>
            <ElectionsList electionsData={elections} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Elections;

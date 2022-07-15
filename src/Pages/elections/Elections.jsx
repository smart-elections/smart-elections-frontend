import './elections.scss';
import elections_list from './mock_data/elections_list';

const listElections = elections_list.map((elections) => (
  <div className='elections__card' key={elections.id}>
    <div className='card_info'>
      <p className='elections__year'>{elections.elections_date.slice(0, 4)}</p>
      <p className='elections__type'>{elections.elections_type}</p>
      <p className='elections__round'>{elections.elections_round}</p>
      <p className='elections__winner'>
        {elections.elections_round === '1st' ? '1st round' : elections.winner}
      </p>
      <p className='elections__date'>{elections.elections_date}</p>
      <div className='elections__button_box'>
        <button
          type='submit'
          className={
            elections.completed
              ? 'elections__button__completed'
              : 'elections__button__pending'
          }
        >
          {elections.completed ? 'View' : 'Vote'}
        </button>
      </div>
    </div>
  </div>
));

const Elections = () => {
  return (
    <>
      <div className='elections__block'>
        <div className='elections__card__header'>
          <div className='card_info'>
            <p className='elections__year__title'>Year</p>
            <p className='elections__type__title'>Type</p>
            <p className='elections__round__title'>Round</p>
            <p className='elections__winner__title'>Winner</p>
            <p className='elections__date__title'>Date</p>
            <p className='elections__blank__title'></p>
          </div>
        </div>
        <div className='elections__container' id='style-scrollbar'>
          <div className='main_content'>{listElections}</div>
        </div>
      </div>
    </>
  );
};

export default Elections;

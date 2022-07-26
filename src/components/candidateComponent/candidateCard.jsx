import React from 'react';
import './candidateCard.scss';

function CandidateCard({ imageUrl, buttonAction, name, party, buttonText }) {
  return (
    <div className='candidate__card'>
      <div className='candidate__card__header'>
        <img className='candidate__image' src={imageUrl} alt='candidate' />
        <button className='candidate__action__button' onClick={buttonAction}>
          {buttonText}
        </button>
      </div>
      <div className='candidate__card__body'>
        <div className='candidate__card__body__name'>{name}</div>
        <div className='candidate__card__body__party'>{party}</div>
      </div>
    </div>
  );
}

export default CandidateCard;

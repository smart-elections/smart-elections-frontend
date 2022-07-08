import React from 'react';
import './candidateCard.scss';

function CandidateCard(props) {
    return (
        <div className="candidate__card">
            <div className="candidate__card__header">
                <img className="candidate__image" src={props.imageUrl} alt="candidate-image" />
                <button className='candidate__action__button' onClick={props.buttonAction}>View</button>
            </div>
            <div className="candidate__card__body">
                <div className="candidate__card__body__name">
                    {props.name}
                </div>
                <div className="candidate__card__body__party">
                    {props.party}
                </div>
            </div>
        </div>
    );
}

export default CandidateCard;
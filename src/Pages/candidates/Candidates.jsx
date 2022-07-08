import './candidates.scss';
import CandidateCard from '../../components/candidateComponent/candidateCard.jsx';
import React, { useState } from 'react';
import CandidateProfileModal from '../../components/candidateProfileModal/CandidateProfileModal.jsx';

const tempCandidate = [
  {
    imageUrl: 'https://i.ibb.co/y0h5K6C/macron-modified.png',
    name: 'emmanuel macron',
    party: 'La république en Marche!',
    biography: 'Emmanuel Jean-Michel Frédéric Macron is a French politician who has been serving as the president of France since 2017. Prior to his presidency, he served as the Minister of the Economy, Industry and Digital Affairs between 2014 and 2016',
    dateOfBirth: '1977-01-01'
  },
  {
    imageUrl: 'https://i.ibb.co/Bf9LNYP/lepin-modified.png',
    name: 'Marine le Pen',
    party: 'Rassemblement national',
    biography: 'Marion Anne Perrine "Marne" Le Pen is a French lawyer and politician who ran for the French presidency in 2012, 2017, and 2022. A member of the National Rally, she served as its president from 2011 to 2021. She has been the member of the National Assembly for the 11th constituency of Pas-de-Calais since 2017',
    dateOfBirth: '1954-01-01'
  }
]

const Candidates = () => {

  const [selectedCandidate, setSelectedCandidate] = useState({});

  const [showModal, setShowModal] = useState(false);

  const openCandidateModal = (candidate) => {
    console.log(candidate);
    setShowModal(prev => !prev);
    setSelectedCandidate(candidate);
  }

  return (
    <div>
      <CandidateProfileModal
        candidateDetails={selectedCandidate}
        text='Text'
        showModal={showModal}
        setShowModal={setShowModal} />

      <div style={{ display: 'flex' }}>
        {tempCandidate.map(candidate => (
          <CandidateCard
            key={candidate.name}
            imageUrl={candidate.imageUrl}
            buttonAction={openCandidateModal.bind(this, candidate)}
            name={candidate.name}
            party={candidate.party} />
        ))}
      </div>
    </div>
  );
};

export default Candidates;

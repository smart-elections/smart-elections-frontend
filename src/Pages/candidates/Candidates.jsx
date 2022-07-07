import './candidates.scss';
import CandidateCard from '../../components/candidateComponent/candidateCard.jsx';

const Candidates = () => {
  return (
    <div>
      <CandidateCard
        imageUrl='https://i.kym-cdn.com/entries/icons/original/000/035/634/Emmanuel_Macron2.png'
        viewOrVote='View'
        name='emmanuel macron'
        party='La république en Marche!' />
    </div>
  );
};

export default Candidates;

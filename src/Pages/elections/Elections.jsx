import './elections.scss';

const testCandidate = [
  {
    candidateId: 111,
    name: 'Emmanuel Macron',
    party: 'La République',
  }
]

const testElection = {
  electionId: 123,
  election_type: 'presidential',
  election_year: '2022',
  election_round: '1st',
}

const metaMaskAddress = '0x1234567890123456789012345678901234567890';

function sendTransaction(candidateId, metaMaskAddress, electionId) {
  console.log('sendTransaction', candidateId, metaMaskAddress, electionId);
}

const Elections = () => {
  return (
    <div>
      <h1>Vote Test</h1>
      <div className="metaMaskAddress">
        <p>MetaMask address: {metaMaskAddress}</p>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        sendTransaction(testCandidate[0].candidateId, metaMaskAddress, testElection.electionId);
      }}>
        <div className="candidate">
          <div className="candidate-name">
            <label>
              <input type="radio" name="candidate" value={testCandidate[0].candidateId} />
              {testCandidate[0].name}
            </label>

            <button type="submit">Vote</button>
          </div>
        </div>
      </form>
    </div >
  )
};

export default Elections;

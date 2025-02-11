// const SavedCandidates = () => {
//   return (
//     <>
//       <h1>Potential Candidates</h1>
//     </>
//   );
// };

// export default SavedCandidates;

import { useState, useEffect } from 'react';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  const handleRemoveCandidate = (candidateId: number) => {
    const updatedSavedCandidates = savedCandidates.filter(
      (candidate) => candidate.id !== candidateId
    );
    setSavedCandidates(updatedSavedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
  };

  if (savedCandidates.length === 0) {
    return <div>No potential candidates have been saved yet!</div>;
  }

  return (
    <div style={{ paddingTop: '70px', textAlign: 'center' }}> 
      <h1>Potential Candidates</h1>
      <div className="table-responsive">
      <table className="table table-bordered mx-auto" style={{ width: '80%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Location</th>
            <th>Avatar</th>
            <th>Email</th>
            <th>Profile</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.username}</td>
              <td>{candidate.username}</td>
              <td>{candidate.location}</td>
              <td>
                <img src={candidate.avatar_url} alt={candidate.username} width="50" height="50" />
              </td>
              <td>{candidate.email}</td>
              <td>
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                  Profile
                </a>
              </td>
              <td>{candidate.company}</td>
              <td>
                <button onClick={() => handleRemoveCandidate(candidate.id)} className="btn btn-danger">-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default SavedCandidates;
// const SavedCandidates = () => {
//   return (
//     <>
//       <h1>Potential Candidates</h1>
//     </>
//   );
// };

// export default SavedCandidates;

import { useState, useEffect } from 'react';
import '../../src/index.css';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' }>({
    key: 'username',
    direction: 'ascending',
  });

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

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key, direction });

    const sortedCandidates = [...savedCandidates].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setSavedCandidates(sortedCandidates);
  };

  if (savedCandidates.length === 0) {
    return <div>No potential candidates have been saved yet!</div>;
  }

  

  return (
    <div style={{ paddingTop: '70px', textAlign: 'center' }}>
      <h1>Potential Candidates</h1>
      <div className="table-responsive">
        <table className="table table-bordered mx-auto" style={{ width: '80%' }}>
          <thead className="bg-dark">
            <tr>
              <th>
            <button onClick={() => handleSort('username')}>
                  Name {sortConfig.key === 'username' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                </button>
              </th>
              <th>
                <button onClick={() => handleSort('username')}>
                  Username {sortConfig.key === 'username' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                </button>
              </th>
              <th>
                <button onClick={() => handleSort('location')}>
                  Location {sortConfig.key === 'location' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                </button>
              </th>
              <th>Avatar</th>
              <th>
                <button onClick={() => handleSort('email')}>
                  Email {sortConfig.key === 'email' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                </button>
              </th>
              <th>Profile</th>
              <th>
                <button onClick={() => handleSort('company')}>
                  Company {sortConfig.key === 'company' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                </button>
              </th>
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
                  <button onClick={() => handleRemoveCandidate(candidate.id)} className="btn btn-danger" >-</button>
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
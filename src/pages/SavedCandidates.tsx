

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

  const handleRemoveCandidate = (candidateUsername: number) => {
    const updatedSavedCandidates = savedCandidates.filter(
      (candidate) => candidate.username !== candidateUsername
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
      <div className="table-wrapper d-flex flex-column">
        <table className="table table-bordered mx-auto" style={{ width: '80%' }}>
          <thead className="bg-dark">
            <tr>
              <th>
                <button onClick={() => handleSort('username')}>
                  Image {sortConfig.key === 'name' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                </button>
              </th>
              <th>
                <button onClick={() => handleSort('username')}>
                  Name {sortConfig.key === 'username' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                </button>
              </th>
              <th>
                <button onClick={() => handleSort('location')}>
                  Location {sortConfig.key === 'location' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                </button>
              </th>

              <th>
                <button onClick={() => handleSort('email')}>
                  Email {sortConfig.key === 'email' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                </button>
              </th>

              <th>
                <button onClick={() => handleSort('company')}>
                  Company {sortConfig.key === 'company' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                </button>
              </th>
              <th>
                <button onClick={() => handleSort('bio')}>
                  Bio {sortConfig.key === 'bio' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                </button>
              </th>
              {/* <th>Bio</th> */}
              <th>
                <button onClick={() => handleSort('profile')}>
                  Profile Link {sortConfig.key === 'profile' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
                </button>
              </th>
              {/* <th>Profile</th> */}
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.username}>
                <td>
                  <img src={candidate.avatar_url} alt={candidate.username} width="50" height="50" />
                </td>
                <td style={{ wordWrap: 'break-word', maxWidth: '150px' }}>{candidate.name}</td>
                <td style={{ wordWrap: 'break-word', maxWidth: '150px' }}>{candidate.location}</td>
                <td style={{ wordWrap: 'break-word', maxWidth: '150px' }}>{candidate.email}</td>
                <td style={{ wordWrap: 'break-word', maxWidth: '150px' }}>{candidate.company}</td>
                <td style={{ wordWrap: 'break-word', maxWidth: '150px' }}>{candidate.bio}</td>
                <td>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                    Profile
                  </a>
                </td>
                <td>
                  <button onClick={() => handleRemoveCandidate(candidate.username)} className="btn btn-danger" >-</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      </div>
  );
};

export default SavedCandidates;
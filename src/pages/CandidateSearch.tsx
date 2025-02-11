import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');


  // Data from localstorage
  useEffect(() => {
    const savedlocal = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(savedlocal);
  }, []);

  // From GitHUB API

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const result = await searchGithub();
        if (result && result.length > 0) {
          const detailedCandidates = await Promise.all(
            result.map(async (user: any) => {
              const userDetails = await searchGithubUser(user.login);
              return {
                username: user.login,
                name: userDetails.name || 'N/A',
                location: userDetails.location || 'N/A',
                email: userDetails.email || 'N/A',
                avatar_url: userDetails.avatar_url,
                html_url: userDetails.html_url,
                company: userDetails.company || 'N/A',
                bio: userDetails.bio || 'N/A'
              };
            })
          );
          setCandidates(detailedCandidates);
        } else {
          setError('No candidates found.');
        }
      } catch (err) {
        setError('Failed to fetch candidates');
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);


  const saveCandidate = (candidate: Candidate) => {
    const updatedSavedCandidates = [...savedCandidates, candidate];
    setSavedCandidates(updatedSavedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
    setCurrentIndex(currentIndex + 1);
  };

  const handleSkipCandidate = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const currentCandidate = candidates[currentIndex];
  if (!currentCandidate) {
    return <div>No more candidates available</div>;
  }

  return (
    <div style={{ paddingTop: '70px' }}>
      <div className="container text-center mt-5 bg-dark">
        <h1>Candidate Search</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={currentCandidate.avatar_url}
            alt={currentCandidate.name}
            width="150"
            height="150"
            style={{ borderRadius: '50%' }}
          />

          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <h3>{currentCandidate.username}</h3>
            <p>{currentCandidate.name}</p>
            <p>{currentCandidate.location}</p>
            <p>{currentCandidate.email}</p>
            <p>{currentCandidate.html_url}</p>
            <p>{currentCandidate.company}</p>
            <p>{currentCandidate.bio}</p>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '90px' }}>
            <button onClick={() => saveCandidate(currentCandidate)} className="btn btn-success" >+</button>
            <button onClick={handleSkipCandidate} className="btn btn-danger"> - </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CandidateSearch;


import { Candidate } from '../interfaces/Candidate.interface';
import { useState, useEffect } from 'react';

const SavedCandidates = () => {
  const [result, setResult] = useState<Candidate[]>([]);
  useEffect(() => {
    let parsedUsersToCandidate: Candidate[] = [];
    const storedUsersToCandidate = localStorage.getItem('CandidatesList');
    if (typeof storedUsersToCandidate === 'string') {
      parsedUsersToCandidate = JSON.parse(storedUsersToCandidate);
    }
    parsedUsersToCandidate = parsedUsersToCandidate.filter(
      (user: Candidate) => user.login !== null && user.login !== undefined
    );
    localStorage.setItem('CandidatesList', JSON.stringify(parsedUsersToCandidate));
    setResult(parsedUsersToCandidate);
    
  }
    , []);

  return (
    <>
      <h1>Potential Candidates</h1>
      <table>
  <thead>
  <tr>
    <th>Image</th>
    <th>Name</th>
    <th>Location</th>
    <th>Email</th>
    <th>Company</th>
    <th>Bio</th>
    <th>Reject</th>
  </tr>
  </thead>
  <tbody>
  {result.map((user: Candidate) => (
    <tr key={user.id}>
      <td>
        <img src={`${user.avatar_url}`} alt={`${user.login}`} />
      </td>
      <td>{user.name}</td>
      <td>{user.location}</td>
      <td>{user.email}</td>
      <td>{user.company}</td>
      <td>{user.bio}</td>
      <td>
        <button onClick={() => {
          const updatedResult = result.filter((u) => u.id !== user.id);
          setResult(updatedResult);
          localStorage.setItem('CandidatesList', JSON.stringify(updatedResult));
        }}>Reject</button>
      </td>
    </tr>
  ))}
  </tbody>
</table>
    </>
  );
};

export default SavedCandidates;

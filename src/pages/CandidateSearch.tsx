import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface'; // Ensure this exists

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // Type it properly
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await searchGithub();
        setCandidates(users);
        setLoading(false);

        // Optionally fetch full profile of first user
        if (users[0]?.login) {
          const fullUser = await searchGithubUser(users[0].login);
          console.log('Full user:', fullUser);
        }
      } catch (error) {
        console.error('Error fetching GitHub users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section>
      <h1>Candidate Search</h1>
      {loading && <p>Loading...</p>}
      <pre>{JSON.stringify(candidates, null, 2)}</pre>
    </section>
  );
};

export default CandidateSearch;

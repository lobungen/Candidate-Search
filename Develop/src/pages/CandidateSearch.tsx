import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import UserCard from '../components/UserCard.tsx';

const CandidateSearch = () => {
  const [currentUser, setCurrentUser] = useState<Candidate>({
    avatar_url: null,
    html_url: null,
    login: null,
    id: 0,
    name: null,
    location: null,
    email: null,
    company: null,
    bio: null,
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [result, setResult] = useState<Candidate[]>([]);
  const addToCandidateList = (selection:boolean) => {
    if (selection) {
    let parsedUsersToCandidate: Candidate[] = [];
    const storedUsersToCandidate = localStorage.getItem('CandidatesList');
    if (typeof storedUsersToCandidate === 'string') {
      parsedUsersToCandidate = JSON.parse(storedUsersToCandidate);
    }
    parsedUsersToCandidate.push(currentUser);
    localStorage.setItem('CandidatesList', JSON.stringify(parsedUsersToCandidate));}
    
    if (currentIndex < result.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentUser(result[currentIndex + 1]);
    }
    else {
      setCurrentIndex(0);
      setCurrentUser(result[0]);
    }
  };

  const searchForUsers = async () => {
    const data: Candidate[] = await searchGithub();

    console.log('Data:', data);
    setResult(data);
    await searchspecificUser(data[0].login || '');
  };

  const searchspecificUser = async (username: string) => {
    const data: Candidate = await searchGithubUser(username);
    console.log('Data:', data);
    setCurrentUser(data);
  };

  useEffect(() => {
    searchForUsers();
  }
    , []);

  return (
    <>
      <section id='searchSection'>
        <h1>Candidate Search</h1>

        <div className='resultsContainer'>
            <UserCard
              currentUser={currentUser}
              
              addToCandidateList={addToCandidateList}
            />
        </div>
      </section>
    </>
  );
};

export default CandidateSearch;

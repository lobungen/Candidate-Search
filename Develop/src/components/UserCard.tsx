import { Candidate } from '../interfaces/Candidate.interface';
import { IoEyeOutline } from 'react-icons/io5';
import { CgPlayListAdd } from 'react-icons/cg';



type CandidateCardProps = {
  currentUser: Candidate;
    addToCandidateList: (selection:boolean) => void;
};

const UserCard = ({
  currentUser,
  addToCandidateList,
}: CandidateCardProps) => {
  return (
    <>
      {currentUser?.login ? (
        <section className='filmCard'>
          <figure>
            <img src={`${currentUser.avatar_url}`} alt={`${currentUser.login}`} />
          </figure>
          <article className='details'>
            <h2>{currentUser.name}</h2>
            <p>
              <strong>Location:</strong> {currentUser.location}
            </p>
            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>
            <p>
              <strong>Company:</strong> {currentUser.company}
            </p>
            <p>
              <strong>Bio:</strong> {currentUser.bio}
            </p>
          </article>
          <article className='plot'>
            <a href='{currentUser.html_url}' target='_blank' rel='noreferrer'>
                <strong>GitHub Profile:</strong> {currentUser.login}
            </a>
          </article>

            <aside className='icons'>
              <CgPlayListAdd
                style={{ fontSize: '50px', cursor: 'pointer' }}
                onClick={() => addToCandidateList(true)}
              />
              <IoEyeOutline
                style={{ fontSize: '50px', cursor: 'pointer' }}
                onClick={() => addToCandidateList(false)}
              />
            </aside>
          )}
        </section>
      ) : (
        <h1 style={{ margin: '16px 0' }}>Please search for a film.</h1>
      )}
    </>
  );
};

export default CandidateCard;

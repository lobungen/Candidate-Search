import { useEffect, useState } from "react";
import { searchGithub } from "../api/API";

interface GitHubUser {
  login: string;
  name?: string;
  avatar_url: string;
  bio?: string;
  html_url: string;
  email?: string;
  location?: string;
  organizations_url: string;
  company?: string;
}

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<GitHubUser | null>(null);
  const [error, setError] = useState("");

  // Fetch and display a random GitHub user
  const renderRandomCandidate = async () => {
    try {
      const userArray = await searchGithub();
      const user = userArray[0];

      if (user) {
        setCandidate(user);
        setError("");
      } else {
        setCandidate(null);
        setError("User not found or an error occurred.");
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    }
  };

  // Save current candidate to localStorage
  const saveCandidate = () => {
    if (!candidate) return;

    const storedCandidates: GitHubUser[] = JSON.parse(
      localStorage.getItem("candidates") || "[]"
    );

    const alreadySaved = storedCandidates.some(
      (c) => c.login === candidate.login
    );

    if (!alreadySaved) {
      storedCandidates.push(candidate);
      localStorage.setItem("candidates", JSON.stringify(storedCandidates));
      alert("Candidate saved successfully!");
    } else {
      alert("This candidate is already saved.");
    }
  };

  useEffect(() => {
    renderRandomCandidate();
  }, []);

  return (
    <div>
      <header>
        <h1>Candidate Search</h1>
      </header>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {candidate ? (
        <div>
          <h2>{candidate.name || candidate.login}</h2>
          <img src={candidate.avatar_url} alt="Profile" width={100} />
          <p><strong>Email:</strong> {candidate.email || "Not available"}</p>
          <p><strong>Bio:</strong> {candidate.bio || "Not available"}</p>
          <p><strong>Location:</strong> {candidate.location || "Not available"}</p>
          <p><strong>Company:</strong> {candidate.company || "Not available"}</p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a href={candidate.html_url} target="_blank" rel="noreferrer">
              {candidate.login}
            </a>
          </p>

          <button
      onClick={() => {
        saveCandidate();
        renderRandomCandidate();
      }}
      aria-label="Save and Next"
      style={{ marginRight: "1rem", fontSize: "1.5rem", padding: "0.5rem 1rem" }}
    >
      +
    </button>
    <button
      onClick={renderRandomCandidate}
      aria-label="Skip and Next"
      style={{ fontSize: "1.5rem", padding: "0.5rem 1rem" }}
    >
      -
    </button>
  </div>
      ) : (
        <p>No more candidates are available to review.</p>
      )}
    </div>
  );
};

export default CandidateSearch;

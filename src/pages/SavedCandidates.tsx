import { useState, useEffect } from "react";

interface GitHubUser {
  login: string;
  name?: string;
  avatar_url: string;
  bio?: string;
  html_url: string;
  email?: string;
  location?: string;
  company?: string;
}

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<GitHubUser[]>([]);
  const [filterTerm, setFilterTerm] = useState(""); // For filtering
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // For sorting

  // Load saved candidates from localStorage on mount
  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem("candidates") || "[]") as GitHubUser[];
    setSavedCandidates(candidates);
  }, []);

  // Remove candidate by login
  const removeSavedCandidate = (login: string) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.login !== login
    );

    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
    setSavedCandidates(updatedCandidates);
  };

  // Filter candidates by name or login matching filterTerm (case insensitive)
  const filteredCandidates = savedCandidates.filter((candidate) => {
    const searchTerm = filterTerm.toLowerCase();
    return (
      candidate.name?.toLowerCase().includes(searchTerm) ||
      candidate.login.toLowerCase().includes(searchTerm)
    );
  });

  // Sort filtered candidates by name or login alphabetically
  const sortedCandidates = filteredCandidates.sort((a, b) => {
    const nameA = (a.name || a.login).toLowerCase();
    const nameB = (b.name || b.login).toLowerCase();

    if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
    if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <h1>Saved Candidates</h1>

      {/* Filter input */}
      <input
        type="text"
        placeholder="Filter by name or login"
        value={filterTerm}
        onChange={(e) => setFilterTerm(e.target.value)}
        style={{ padding: "0.5rem", marginBottom: "1rem", width: "100%", maxWidth: "300px" }}
      />

      {/* Sort button */}
      <button
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
        aria-label="Toggle sort order"
      >
        Sort: {sortOrder === "asc" ? "A → Z" : "Z → A"}
      </button>

      {sortedCandidates.length === 0 ? (
        <p>No candidates found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {sortedCandidates.map((candidate) => (
            <li
              key={candidate.login}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "6px",
              }}
            >
              <h2>{candidate.name || candidate.login}</h2>
              <img src={candidate.avatar_url} alt={candidate.login} width={100} />
              <p><strong>Location:</strong> {candidate.location || "Not available"}</p>
              <p><strong>Email:</strong> {candidate.email || "Not available"}</p>
              <p><strong>Company:</strong> {candidate.company || "Not available"}</p>
              <p>
                <a
                  href={candidate.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub Profile
                </a>
              </p>
              <button
                onClick={() => removeSavedCandidate(candidate.login)}
                style={{
                  backgroundColor: "crimson",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;

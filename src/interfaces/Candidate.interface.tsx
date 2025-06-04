// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    avatar_url: string|null;
    html_url: string|null;
    login: string|null;
    id: number;
    name: string|null;
    location: string|null;
    email: string|null;
    company: string|null;
    bio: string|null;
  }
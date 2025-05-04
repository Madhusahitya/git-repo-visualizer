// src/hooks/useGitHubAPI.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Contributor {
  login: string;
  contributions: number;
}

const useGitHubAPI = (owner: string, repo: string) => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const res = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`);
        setContributors(res.data.map((c: any) => ({
          login: c.login,
          contributions: c.contributions,
        })));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch contributors');
        setLoading(false);
      }
    };

    fetchContributors();
  }, [owner, repo]);

  return { contributors, loading, error };
};

export default useGitHubAPI;
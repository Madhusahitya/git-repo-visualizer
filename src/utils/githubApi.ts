// src/utils/githubApi.ts
import axios from 'axios';

export const fetchRepoTree = async (owner: string, repo: string) => {
  const res = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`
  );
  return res.data.tree;
};

export const fetchContributors = async (owner: string, repo: string) => {
  const res = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/contributors`
  );
  return res.data;
};
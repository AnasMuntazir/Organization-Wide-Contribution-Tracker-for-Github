import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Repositories.css';

const Repositories = () => {
  const { auth } = useContext(AuthContext);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = auth.token;
  const username = auth.user?.githubUsername;

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/github/repos/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRepos(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (token && username) fetchRepos();
  }, [token, username]);

  const viewContributors = (owner, repo) => {
    navigate(`/contributor/${username}?repo=${repo}`);
  };

  if (loading) return <div className="repositories">Loading...</div>;

  return (
    <div className="repositories">
      <h2 className="text-purple">Repositories</h2>
      <div className="repo-list">
        {repos.map((repo) => (
          <div className="repo-card" key={repo.id}>
            <h3>{repo.name}</h3>
            <p>{repo.description || 'No description'}</p>
            <p>⭐ {repo.stargazers_count} Stars</p>
            <p>🍴 {repo.forks_count} Forks</p>
            <button onClick={() => viewContributors(username, repo.name)}>View Contributors</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Repositories;

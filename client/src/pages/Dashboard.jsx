import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = auth.token;
  const username = auth.user?.githubUsername;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await axios.get(`http://localhost:5000/api/github/user/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const repoRes = await axios.get(`http://localhost:5000/api/github/repos/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(profileRes.data);
        setRepos(repoRes.data.slice(0, 5)); // show top 5
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (token && username) {
      fetchData();
    }
  }, [token, username]);

  if (loading) return <div className="dashboard">Loading...</div>;

  return (
    <div className="dashboard">
      <div className="profile-card">
        <img src={profile.avatar_url} alt="Avatar" className="avatar" />
        <h2>{profile.name || profile.login}</h2>
        <p>{profile.bio}</p>
        <a href={profile.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
      </div>

      <div className="stats">
        <h3>Total Repositories: {profile.public_repos}</h3>
        <h4>Top Repositories</h4>
        <ul className="repo-list">
          {repos.map((repo) => (
            <li key={repo.id}>
              <strong>{repo.name}</strong><br />
              <span>{repo.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

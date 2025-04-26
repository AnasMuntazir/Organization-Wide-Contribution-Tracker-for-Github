import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './ContributorProfile.css';

const ContributorProfile = () => {
  const { auth } = useContext(AuthContext);
  const { username } = useParams();
  const { search } = useLocation();

  const token = auth.token;
  const repo = new URLSearchParams(search).get('repo');

  const [contributors, setContributors] = useState([]);
  const [ownerProfile, setOwnerProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const contribRes = await axios.get(
          `http://localhost:5000/api/github/contributors/${username}/${repo}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const profileRes = await axios.get(
          `http://localhost:5000/api/github/user/${username}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setOwnerProfile(profileRes.data);
        setContributors(contribRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (username && repo && token) fetchContributors();
  }, [username, repo, token]);

  if (loading) return <div className="contributor-page">Loading...</div>;

  return (
    <div className="contributor-page">
      <div className="owner-profile">
        <img src={ownerProfile.avatar_url} alt="Avatar" className="avatar" />
        <h2>{ownerProfile.name || ownerProfile.login}</h2>
        <p><a href={ownerProfile.html_url} target="_blank" rel="noopener noreferrer">View GitHub Profile</a></p>
        <p><strong>Repository:</strong> {repo}</p>
      </div>

      <h3 className="text-purple">Contributors</h3>
      <ul className="contributor-list">
        {contributors.map((contrib) => (
          <li key={contrib.id || contrib.login}>
            <img src={contrib.avatar_url} alt="Contributor" />
            <div>
              <strong>{contrib.login}</strong><br />
              <span>Contributions: {contrib.contributions}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContributorProfile;

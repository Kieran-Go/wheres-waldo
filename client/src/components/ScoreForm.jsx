import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/ScoreForm.css';
import formatTimer from "../util/formatTimer";
import { Link } from "react-router-dom";

export default function ScoreForm({ time, sceneId }) {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const serverOrigin = import.meta.env.VITE_SERVER_ORIGIN;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create scoreData object
    const scoreData = {
      name,
      time,
      sceneId: parseInt(sceneId, 10), // Convert to int
    };

    // Post score data to db
    try {
      const res = await fetch(`${serverOrigin}/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scoreData),
      });

      if (!res.ok) throw new Error("Failed to submit score");

      // Go to leaderboard with the active scene set to this scene
      localStorage.setItem('activeSceneId', sceneId);
      navigate("/leaderboard");
    } catch (err) {
      alert("An error occurred submitting your score.");
    }
  };

  return (
    <div className="scoreform__overlay">
      <div className="scoreform__container">
        <h2>You found all characters!</h2>
        <p>Your time: <span>{formatTimer(time)}</span></p>
        <p>Enter a name to submit to the leaderboard:</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 30))}
            required
            className="scoreform__input"
            maxLength={30}
          />
          <button type="submit" className="scoreform__button">Submit Score</button>
        </form>

        <Link to='/'>
            <button>Back to Home</button>
        </Link>
      </div>
    </div>
  );
}
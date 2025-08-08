import HomeHeader from "./HomeHeader";
import "../css/Leaderboard.css";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import formatTimer from "../util/formatTimer";
import { DataContext } from "./App";
import Loading from "./Loading";

export default function Leaderboard() {
    // Get scenes data from context
    const { scenes } = useContext(DataContext);
    const [activeScene, setActiveScene] = useState(null);
    const [scores, setScores] = useState(null);

    const serverOrigin = import.meta.env.VITE_SERVER_ORIGIN;

    // On first mount: set document title and initialize active scene
    useEffect(() => {
        document.title = `Leaderboard - Where's Waldo?`;

        const sceneId = getActiveSceneId();
        const foundScene = scenes?.find(scene => scene.id === sceneId);
        if (foundScene) {
            setActiveScene(foundScene);
        }
    },[scenes]);

    // Fetch scores when activeScene changes
    useEffect(() => {
        if (!activeScene) return;

        const fetchScores = async () => {
            try {
                const res = await fetch(`${serverOrigin}/scenes/${activeScene.id}/scores`);
                if (!res.ok) throw new Error("Failed to fetch scores.");
                const data = await res.json();
                setScores(data);
            } catch (err) {
                setScores([]);
            }
        };
        fetchScores();
    },[activeScene]);

    // Retrieves the active scene ID from localStorage or defaults to first scene ID
    const getActiveSceneId = () => {
        const storedId = localStorage.getItem('activeSceneId');
        return storedId ? parseInt(storedId, 10) : scenes[0]?.id;
    }

    if (!scenes || !activeScene || !scores) return <Loading message="Loading leaderboard..." />;

    return(
        <>
            {/* Render header */}
            <HomeHeader />

            {/* Main leaderboard content */}
            <div className="leaderboard__content">
                {/* h1 header for main content */}
                <h1>Leaderboard</h1>

                {/* Navigation buttons */}
                <div className="leaderboard__buttons-container">
                    {activeScene && (
                        <Link to={`/scene/${activeScene.id}`}><button>Play this level</button></Link>
                    )}
                    <Link to='/'><button>Back to Home</button></Link>
                </div>

                {/* Show all scenes. Use horizontal scrolling */}
                <div className="leaderboard__scenes-container">
                    {scenes.map((scene) => (
                        <div
                            key={scene.id}
                            className={`leaderboard__scene-card ${activeScene?.id === scene.id ? 'active' : ''}`}
                            // On click, set the active scene to this and store it in local storage
                            onClick={() => {
                                setActiveScene(scene);
                                localStorage.setItem('activeSceneId', scene.id);
                            }}
                        >
                            <img src={scene.imageUrl} alt={scene.name} />
                            <p>{scene.name}</p>
                        </div>
                    ))}
                </div>

                {/* Render the actual leaderboard */}
                <div className="leaderboard">
                    <div className="leaderboard__column-titles">
                        <p>NAME</p>
                        <p>TIME (MM:SS)</p>
                    </div>
                    {scores.length > 0 ? (
                        scores.map((score, index) => (
                        <div key={score.id}>
                            <p>{`${index + 1}: ${score.name}`}</p>
                            <p>{formatTimer(score.time)}</p>
                        </div>
                        ))
                    ) : (
                        <p>No scores yet...</p>
                    )}
                </div>
            </div>
        </>
    );
}
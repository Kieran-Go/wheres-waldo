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
    if (!scenes) return <Loading message="Loading scene data..."/>

    const [activeScene, setActiveScene] = useState(null);

    // Use once after mount
    useEffect(() => {
        // Change document title
        document.title = `Leaderboard - Where's Waldo?`;

        // Initialize the active scene
        const scene = getActiveScene();
        setActiveScene(scene);
    },[]);

    // Retrieves the active scene from local storage, or defaults to first scene
    const getActiveScene = () => {
        const storedScene = localStorage.getItem('sceneData');
        if (storedScene) return JSON.parse(storedScene);
        return scenes[0];
    }

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
                            onClick={() => {setActiveScene(scene); localStorage.setItem('sceneData', JSON.stringify(scene));}}
                        >
                            <img src={scene.imageUrl} alt={scene.name} />
                            <p>{scene.name}</p>
                        </div>
                    ))}
                </div>

                {/* Render the actual leaderboard */}
                <div className="leaderboard">
                    {activeScene ? (
                        <>
                            <div className="leaderboard__column-titles">
                                <p>NAME</p>
                                <p>TIME (MINUTES)</p>
                            </div>
                            {activeScene.scores.map((score) => (
                                <div key={score.id}>
                                    <p>{score.name}</p>
                                    <p>{formatTimer(score.time)}</p>
                                </div>
                            ))}
                        </>
                    ) : (
                        <Loading message="Loading score data..." showHeader={false}/> 
                    )}
                </div>
            </div>
        </>
    );
}
import '../css/Scene.css';
import db from '../mockData';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Scene() {
    // Get scene data from db
    const scene = db[0]; // Mock data for now

    // Timer states
    const [timer, setTimer] = useState(0);
    const [runTimer, setRunTimer] = useState(true); // Timer runs while true

    // Change document title
    useEffect(() => {
        document.title = `${scene.name} - Where's Waldo?`;
    },[]);

    // Start timer when component mounts
    useEffect(() => {
        if(runTimer) {
            let interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);

            // Clear interval on unmount
            return () => clearInterval(interval);
        }
    },[runTimer]);

    // Stops the timer from running
    const stopTimer = () => {setRunTimer(false);}

    // Converts seconds to MM:SS format
    const formatTimer = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Handle when scene image is clicked
    const imageClick = (event) => {
        
    }

    return(
        <>
            {/* Render the header */}
            <div className="scene__header">
                {/* Left column*/}
                <div className="scene__characters-container">
                    {scene.characters.map((character) => (
                    <div className="scene__character-card" key={character.id}>
                        <img className="scene__character-img" src={character.imageUrl} alt={character.name} />
                        <p>{character.name}</p>
                    </div>
                    ))}
                </div>

                {/* Center column*/}
                <h3 className="scene__time">Time: {formatTimer(timer)}</h3>

                {/* Right column*/}
                <Link to="/">
                    <button>Return Home</button>
                </Link>
            </div>


            {/* Render the image */}
            <img className='scene__img' src={scene.imageUrl} onClick={imageClick} alt={`Scene: ${scene.name}`} />
        </>
    );
}
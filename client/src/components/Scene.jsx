import '../css/Scene.css';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import formatTimer from '../util/formatTimer';
import { DataContext } from './App';
import ScoreForm from './ScoreForm';

export default function Scene() {
    // Get scenes data from context
    const { scenes } = useContext(DataContext);
    if (!scenes) return <Loading message="Loading scene data..."/>

    // Get specific scene data using params
    const { id } = useParams();
    const scene = scenes?.find((s) => s.id.toString() === id);
    if (!scene) return <Loading message="Loading scene data..."/>

    // States
    const [gameInProgress, setGameInProgress] = useState(true);
    const [characters, setCharacters] = useState(null);
    const [timer, setTimer] = useState(0);
    const [clickCoords, setClickCoords] = useState(null);
    const [showCharacterMenu, setShowCharacterMenu] = useState(false);

    // Mount once
    useEffect(() => {
        // Change document title
        document.title = `${scene.name} - Where's Waldo?`;

        // Initialize characters array
        setCharacters(initCharacters());
    },[]);

    // Start timer when component mounts
    useEffect(() => {
        if(gameInProgress) {
            let interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);

            // Clear interval on unmount
            return () => clearInterval(interval);
        }
    },[gameInProgress]);

    // When characters array changes, check characters and end game if all are found
    useEffect(() => {
        if (characters && allCharactersFound()) {
            endGame();
        }
    },[characters]);

    // Initialize the array of characters
    const initCharacters = () => {
        return scene.characters.map(character => ({
            id: character.id,
            name: character.name,
            imageUrl: character.imageUrl,
            found: false,
            xMin: character.xMin,
            xMax: character.xMax,
            yMin: character.yMin,
            yMax: character.yMax,
        }));
    }

    // Handle when scene image is clicked
    const imageClick = (event) => {
        const image = event.target;
        const rect = image.getBoundingClientRect();

        // Get clicked coordinates
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        // Get natural image size
        const naturalWidth = image.naturalWidth;
        const naturalHeight = image.naturalHeight;

        // Get displayed image size
        const displayedWidth = rect.width;
        const displayedHeight = rect.height;

        // Calculate scale factor
        const scaleX = naturalWidth / displayedWidth;
        const scaleY = naturalHeight / displayedHeight;

        // Convert click coordinates to natural image coordinates
        const x = clickX * scaleX;
        const y = clickY * scaleY;

        setClickCoords({ x: clickX, y: clickY, xNormalized: x, yNormalized: y });
        setShowCharacterMenu(true);
    }

    // Checks if the click coordinates are in range of selected character
    const handleCharacterSelect = (character) => {
        // Character coordinates box
        const box = {
            xMin: character.xMin,
            xMax: character.xMax,
            yMin: character.yMin,
            yMax: character.yMax,
        }

        // User's normalized clicked coordinates
        const clickedX = clickCoords.xNormalized;
        const clickedY = clickCoords.yNormalized;

        // Look for the character 
        const found = (
            clickedX >= box.xMin &&
            clickedX <= box.xMax &&
            clickedY >= box.yMin &&
            clickedY <= box.yMax
        );

        if (found) {
            // Mark character as found in the characters array
            setCharacters(prevCharacters =>
            prevCharacters.map(c =>
                c.id === character.id ? { ...c, found: true } : c
            ));
        }

        // Hide the character menu after selection
        setShowCharacterMenu(false);
    };

    // Check if all characters have been found
    const allCharactersFound = () => {
        for(let i = 0; i < characters.length; i++) {
            if(characters[i].found === false) return false;
        }
        return true;
    }

    // End game logic
    const endGame = () => {
        setGameInProgress(false);
    }

    return(
        <>
            {/* Render the header */}
            <div className="scene__header" onClick={() => setShowCharacterMenu(false)}>
                {/* Left column*/}
                <div className="scene__characters-container">
                    {characters &&
                        characters
                        .slice()
                        .sort((a, b) => a.id - b.id)
                        .map((character) => (
                            <div
                                className={
                                    character.found
                                    ? "scene__character-card found"
                                    : "scene__character-card"
                                }
                                key={character.id}
                                >
                                <img
                                    className="scene__character-img"
                                    src={character.imageUrl}
                                    alt={character.name}
                                />
                                <p>{character.name}</p>
                            </div>
                        ))
                    }
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

            {/* Conditionally render character selection menu */}
            {showCharacterMenu && clickCoords && (
                <div
                    className="scene__character-menu"
                    style={{ top: clickCoords.y + 100, left: clickCoords.x, }}
                >
                    {characters &&
                        characters
                        .filter((character) => character.found === false)
                        .sort((a, b) => a.id - b.id)
                        .map((character) => (
                            <div key={character.id} onClick={() => handleCharacterSelect(character)}>
                                <img src={character.imageUrl} alt={character.name} width="30" />
                                <span style={{ marginLeft: '8px' }}>{character.name}</span>
                            </div>
                        ))
                    }
                </div>
            )}

            {/* Render ScoreForm component when game ends */}
            {!gameInProgress && <ScoreForm time={timer} sceneId={id}/>}
        </>
    );
}
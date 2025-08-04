import { useEffect } from "react";
import { Link } from "react-router-dom";
import '../css/Home.css';
import HomeHeader from "./HomeHeader";
import db from "../mockData";

export default function Home() {
  // Change document title
  useEffect(() => {
    document.title = "Where's Waldo?";
  }, []);

  // Retrieve scene data from the db
  const scenes = db;

  return (
    <>
    {/* Render the Home Header */}
      <HomeHeader />

      {/* Render all scenes */}
      <div className="scenes-container">
        {scenes.map((scene) => {
          return (
            <Link className="scene-link" to={`/scene/${scene.id}`} key={scene.id}>
              <div className="scene-card">
                <img src={scene.imageUrl} alt={`Thumbnail for ${scene.name}`} className="scene-img"/>
                <div className="scene-info">
                  <h3 className="scene-name">{scene.name}</h3>
                  <div className="characters-container">
                    {scene.characters.map((character) => {
                      return(
                        <div className="characters-container">
                          <img key={character.id} className="character-img" src={character.imageUrl} alt={character.name}/>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Render the footer */}
      <div className="footer">
        <div className="footer-content">
          <h1>Are you a Waldo expert?</h1>
          <Link to='/leaderboard'>
            <h1>View the leaderboard</h1>
          </Link>
        </div>

        <Link to='/leaderboard'>
          <button>View Leaderboard</button>
        </Link>
      </div>
    </>
  )
}
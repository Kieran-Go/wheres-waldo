import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import '../css/Home.css';
import HomeHeader from "./HomeHeader";
import { DataContext } from "./App";
import Loading from "./Loading";

export default function Home() {
  // Change document title
  useEffect(() => {
    document.title = "Where's Waldo?";
  }, []);

  // Get scenes data from context
  const { scenes } = useContext(DataContext);
  if (!scenes) return <Loading message="Loading scene data..." />
    
  return (
    <>
    {/* Render the Home Header */}
      <HomeHeader />

      {/* Render all scenes */}
      <div className="home__scenes-container">
        {scenes.map((scene) => {
          return (
            <Link className="home__scene-link" to={`/scene/${scene.id}`} key={scene.id}>
              <div className="home__scene-card">
                <img src={scene.imageUrl} alt={`Thumbnail for ${scene.name}`} className="home__scene-img"/>
                <div className="home__scene-info">
                  <h3 className="home__scene-name">{scene.name}</h3>
                  <div className="home__characters-container">
                    {scene.characters.map((character) => {
                      return(
                        <div className="home__character">
                          <img key={character.id} src={character.imageUrl} alt={character.name}/>
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
      <div className="home__footer">
        <div className="home__footer-content">
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
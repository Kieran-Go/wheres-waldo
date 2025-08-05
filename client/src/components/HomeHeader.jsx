import '../css/HomeHeader.css';
import { Link } from 'react-router-dom';
import waldoLogo from '../assets/images/waldo-logo.png';

export default function HomeHeader() {
    return(
        <>
            <div className='home__header'>
                <Link to=''>
                    <img src={waldoLogo} alt="Waldo logo" />
                    <h1>Where's <span>Waldo?</span></h1>
                </Link>
            </div>
        </>
    );
}
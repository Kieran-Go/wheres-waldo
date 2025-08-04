import '../css/HomeHeader.css';
import waldoLogo from '../assets/images/waldo-logo.png';

export default function HomeHeader() {
    return(
        <>
            <div className='header'>
                <img src={waldoLogo} alt="Waldo logo" className='waldo-logo' />
                <h1 className='title'>Where's <span>Waldo?</span></h1>
            </div>
        </>
    );
}
import '../css/Loading.css';
import HomeHeader from './HomeHeader';

export default function Loading({ message, showHeader = true }) {
  return (
    <>
      {showHeader && (<HomeHeader />)}
      <div className="loading__container">
        <div className="loading__spinner"></div>
        {message && <p className="loading__message">{message}</p>}
      </div>
    </>
  );
}
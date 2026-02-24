import './TopBackLink.scss';
import { Link } from 'react-router-dom';
import { LuHouse } from 'react-icons/lu';

export const TopBackLink: React.FC = () => (
  <div className="top__back__link">
    <Link to="/home" className="top__back__link">
      <LuHouse className="house" color="#4a6fa5" />
      <p>На головну</p>
    </Link>
  </div>
);
export default TopBackLink;

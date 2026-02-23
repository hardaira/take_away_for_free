import './Logo.scss';
// import { HiOutlineSpeakerphone } from 'react-icons/hi';
export const Logo: React.FC = () => {
  return (
    <div className="logo__link">
      <p className="logo">
        <span className="logo-word">ЗаБиРай</span>
      </p>
      <p className="logo thank">За ДяКую</p>
    </div>
  );
};

export default Logo;

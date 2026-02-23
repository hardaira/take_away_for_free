import './Footer.scss';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { BsFillEnvelopeFill } from 'react-icons/bs';
export const Footer: React.FC = () => (
  <div className="footer">
    <div className="contact">
      <a href="tel:+48881649784">
        <BsFillTelephoneFill
          style={{
            width: '20px',
            height: '20px',           
          }}
        />
      </a>
      <a href="tel:+48881649784">Зателефонуйте нам</a>
    </div>
    <div className="contact">
      <a href="mailto:example@gmail.com">
        <BsFillEnvelopeFill style={{
                  width: '20px',
                  height: '20px',              
                }}/>
      </a>
      <a href="mailto:example@gmail.com">Напишіть нам</a>
    </div>
  </div>
);
export default Footer;

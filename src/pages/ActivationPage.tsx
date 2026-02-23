 import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
 import TopBackLink from '../components/TopBackLink/TopBackLink';
// import { useOutletContext } from 'react-router-dom';
export const ActivationPage: React.FC = () => {
  const { activationToken } = useParams<{ activationToken?: string }>();
  const navigate = useNavigate();
  // const { user, setUser } = useOutletContext<OutletContextType>();

  const activateUser = async (activationToken: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/users/activation/${activationToken}`,
        {
          method: 'PATCH',
          credentials: 'include',
        },
      );

      const data = await res.json();

      // if (!res.ok) {
      //   navigate('/activation-unsuccessful');
      //   return;
      // }
// console.log(data);
      localStorage.setItem('accessToken', data.accessToken);
      navigate(`/${data.user.id}`);
      // console.log(data.user.name);

      // console.log(data.user);
      // setUser(data.user);
      // console.log(user);
    } catch {
      navigate('/activation-failed');
    }
  };

  useEffect(() => {
    // if (!activationToken) {
    //   navigate('/activation-unsuccessful');
    //   return;
    // }

    activateUser(activationToken);
  }, [activationToken, navigate]);

  // useEffect(() => {
  //   fetch(`http://localhost:5000/users/activate/${activationToken}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.accessToken) {
  //         localStorage.setItem('accessToken', data.accessToken);
  //         navigate(`/profile/${data.userId}`);
  //       } else {
  //         navigate('/activation-unsuccessful');
  //       }
  //     });
  // }, []);

  return (
    <div className="section">
      <div className="container">
        <TopBackLink />
        <h1>Профіль активується...</h1>
      </div>
    </div>
  );
};

import './notFound.scss';
import Logo_grey from '../../assets/images/Logo_grey.png';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const HandleGoBackHome = () => {
    console.log('Back to Home Page');
    navigate('/');
  };

  return (
    <>
      <div className='page-content'>
        <div className='horizontal'>
          <img
            src={Logo_grey}
            alt='Logo de la République française (1999)'
            height={160}
            width={250}
          />
        </div>

        <div className='horizontal'>
          <div className='rightHorizontal'>
            <div className='message-box'>
              <h1>404</h1>
              <p>Page not found</p>
              <div className='buttons-con'>
                <div className='action-link-wrap'>
                  <button
                    onClick={HandleGoBackHome}
                    type='submit'
                    className='action-link-wrap'
                  >
                    Go to Home Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

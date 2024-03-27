import { Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import img from '../../assets/LLmxrBLmaxI.jpg';
import reac from '../../assets/react.svg';
import useAuth from '../Auth/hookAuth';
import styles from './navbar.module.css';

const Navbar:React.FC = () => {
  const navigate = useNavigate();
  const { logOut, user } = useAuth();

  const handleSubmit = () => {
    if (user) {
      logOut();
      navigate('/login');
    }
  }

  return (
    <nav>
      <div className="header">
        <Avatar
          alt="Avatar"
          src={reac}
          sx={{ width: 44, height: 44 }}
        />
        { !user ? <div className='gorup-btn'>
          <Button variant='contained' size='medium' href='/login' className='btn-nav' >Sign In</Button>
          <Button variant='outlined' size='medium' href='/signup' className='btn-nav' style={{ marginLeft: 24 }}>Sign Up</Button>
        </div> : 
        <div className={styles.logout}>
          <Button onClick={handleSubmit} variant='outlined' size='medium' className='btn-nav' >exit</Button>
          <span>{user.username}</span>
          <Avatar alt="Avatar" src={img} sx={{ width: 44, height: 44 }}/> 
        </div>
        }
      </div>
    </nav>
  )
}

export default Navbar;
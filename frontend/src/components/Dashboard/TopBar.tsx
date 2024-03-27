import { useDispatch, useSelector } from "react-redux";
import { RootState, actions } from "../../store/store";
import styles from "./topbar.module.css";

interface IProps {
  type: string;
}

const TopBar: React.FC = () => {
  const dispatch = useDispatch();
  const { type } = useSelector((state:RootState) => state.navSlice.nav);

  const handleChoseActive = (data:IProps) => {
    dispatch(actions.openNav(data));
  }

  return(
    <nav className={styles.topnav}>
      <a className={type === 'support' ? styles.picked : styles.unpicked} onClick={() => handleChoseActive({ type: 'support' })}>Support</a>
      <a className={type === 'history' ? styles.picked : styles.unpicked} onClick={() => handleChoseActive({ type: 'history' })}>History</a>
      <a className={type === 'cards' ? styles.picked : styles.unpicked} onClick={() => handleChoseActive({ type: 'cards' })}>Cards</a>
      <a className={type === 'exchange' ? styles.picked : styles.unpicked} onClick={() => handleChoseActive({ type: 'exchange' })}>Exchange</a>
      <a className={type === 'goals' ? styles.picked : styles.unpicked} onClick={() => handleChoseActive({ type: 'goals' })}>Goals</a>
    </nav>
  )
}

export default TopBar;
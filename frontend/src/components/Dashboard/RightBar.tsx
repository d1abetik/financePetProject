import { Button, Typography } from '@mui/material';
import _ from 'lodash';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ICard } from '../../store/slices/cardSlice';
import { RootState } from '../../store/store';
import TransactionFakeLoader from '../ui/TransactionFakeLoader';
import styles from './rightbar.module.css';

interface CardListProps {
  cards: ICard[];
  currentId: number | null;
}

const RightBar: React.FC<CardListProps> = ({cards, currentId}) => {
  const status = useSelector((state:RootState) => state.cardSlice.loadingStatus);
  console.log(status);
  const currCardIndex = _.findIndex(cards, (card: ICard) => card.id === currentId);
  const currCard: ICard = cards[currCardIndex];
  const [visible, setVisible] = useState(false);
  console.log(cards);
  const onHoverHnadler = () => {
    setVisible(true);
  }
  // const gotUser = async () => {
  //   try {
  //     const response = axios.get('http://localhost:5000/api/u/getAll');
  //     return response.data;
  //   } catch(error) {
  //     console.log(error);
  //   }
  // }

  // const users = gotUser();

  return(
    <article className={styles.container}>
      <div className={styles.box}>
        <Typography id="transaction-title" variant="h6" component="h2" color={'black'}>Transaction history</Typography>
        <div className={styles.containerEl}>
          {currCard && currCard.history.length !== 0 ?
            currCard.history.map(({
              nameTrans,
              amount,
              createdAt,
              userId,
              userName,
              cardName,
              cardId,
              id
            }) => (
            <div className={styles.containerTrans} key={id}>
              <div className={styles.icon}>
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M95.238 42.8571H52.3809C47.3291 42.8571 42.4843 44.8639 38.9122 48.4361C35.34 52.0082 33.3333 56.853 33.3333 61.9048V147.619C33.3333 152.671 35.34 157.516 38.9122 161.088C42.4843 164.66 47.3291 166.667 52.3809 166.667H147.619C152.671 166.667 157.516 164.66 161.088 161.088C164.66 157.516 166.667 152.671 166.667 147.619V104.762" stroke="black" stroke-width="9.52381" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M147.619 52.381L156.695 61.9048M166.667 33.019C169.205 35.6443 170.611 39.1621 170.581 42.8141C170.551 46.4661 169.087 49.96 166.505 52.5429L99.9999 119.048L71.4285 128.571L80.9523 100L147.495 32.8952C149.834 30.5379 152.965 29.1318 156.281 28.9488C159.597 28.7659 162.863 29.8191 165.448 31.9048L166.667 33.019Z" stroke="black" stroke-width="9.52381" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div className={styles.dataInfo}>
                <div>{nameTrans}</div>
                <div key={cardId}>
                  <div>{createdAt.toDateString()}</div>
                  <div key={userId}>{`from: ${userName}`}</div>
                </div>
              </div>
              <div className={styles.usersInfo}>
                <div>{`to card: ${cardName}`}</div>
                <div>{`Amount ${amount}`}</div>
              </div>
              <div hidden={visible} onMouseEnter={onHoverHnadler} className={styles.relButtons}>
                <Button variant="outlined" color="error" className={styles.button}>Delete</Button>
              </div>
            </div>
            )) :
            <TransactionFakeLoader count={5}/>
          }
        </div>
        <div className={styles.gradientOverlay}></div>
      </div>
    </article>
  );
};

export default RightBar;
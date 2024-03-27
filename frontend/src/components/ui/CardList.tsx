import _ from 'lodash';
import { useDispatch } from "react-redux";
import { ICard } from '../../store/slices/cardSlice';
import { AppDispatch, actions } from "../../store/store";
import CardAdd from "./CardAdd";
import styles from './cardList.module.css';
import SwiperContainer from './swiper/SwiperContainer';

export interface ICardProps {
  id: number;
  color: string;
  name: string;
  balance: string;
  style: string;
  type: string;
}

interface CardListProps {
  cards: ICard[];
  currentCardId: number | null;
}

const CardList: React.FC<CardListProps> = ({cards, currentCardId}) => {
  // const {user} = useAuth();
  // const currentCardId = useSelector((state: RootState) => state.cardSlice.currentCardId);

  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (user) {
  //       try {
  //         await dispatch(actions.fetchData(user.id));
  //       } catch(error) {
  //         console.log(error);
  //       }
  //     }
  //   }
  //   fetchData();
  // }, [dispatch, user]);

  const leftPick = () => {
    const indexNow = _.findIndex(cards, (card: ICard) => card.id === currentCardId);
    const prevIndex = (indexNow === 0) ? cards.length - 1 : indexNow - 1;
    const currCard: ICard = cards[prevIndex];
    dispatch(actions.selectCard(currCard.id));
  }

  const rightPick = () => {
    const indexNow = _.findIndex(cards, (card: ICard) => card.id === currentCardId);
    const lastIndex = cards.length - 1;
    const nextIndex = (indexNow === lastIndex) ? 0 : indexNow + 1;
    const currCard: ICard = cards[nextIndex];
    dispatch(actions.selectCard(currCard.id));
  }

  return(
    <div className={styles.main}>
      { cards.length === 0 ? <CardAdd /> :
      <>
        <div className={cards.length === 1 ? styles.arrowDisabled : styles.arrow} onClick={leftPick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={cards.length === 1 ? styles.svgArrLDisabled : styles.svgArrL}>
            <g>
              <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
              <polygon points="13.293 7.293 8.586 12 13.293 16.707 14.707 15.293 11.414 12 14.707 8.707 13.293 7.293"/>
            </g>
          </svg>
        </div>
        <div className={styles.containerCards}>
          <SwiperContainer cards={cards} />
        </div>
        <div className={cards.length === 1 ? styles.arrowDisabled : styles.arrow} onClick={rightPick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={cards.length === 1 ? styles.svgArrRDisabled : styles.svgArrR} >
            <g>
              <path d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20Z"/>
              <polygon points="13.293 7.293 8.586 12 13.293 16.707 14.707 15.293 11.414 12 14.707 8.707 13.293 7.293"/>
            </g>
          </svg>
        </div>
      </>
      }
    </div>
  );
};

export default CardList;
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState, actions } from "../../../store/store";
import Card, { ICardProps } from "../Card";
import styles from './swiper.module.css';

type Props = {
  cards: Array<ICardProps>
}

const SwipeContainer = ({cards}: Props) => {
  const currentId = useSelector((state:RootState) => state.cardSlice.currentCardId);
  const dispatch = useDispatch();

  const pickCardHandler = (card: ICardProps) => {
    dispatch(actions.selectCard(card.id));
  }

  return(
    <div className={styles.swipeContainer}>
      <ul className={styles.swipeList}>
        {cards.map((card, idx) => {
          return(
            <motion.li
              key={idx}
              id={String(card.id)}
              transition={{type: 'spring', duration: 0.4, stiffness: 90, times: [0, 0.2, 0.5, 0.8, 1]}}
              animate={{y: [0, 100, 0]}}
              layout
              className={styles.cardShadow}
              hidden={idx > 5 ? true : false}
              style={{
                scale: currentId !== card.id ? 0.95 - Number(`0.${idx}`) : 1,
                zIndex: currentId !== card.id ? 95 - idx : 100,
                top: currentId !== card.id ? 75 + (idx * 30) : '',
                opacity: currentId !== card.id ? `${90 - (idx * 4)}%` : '100%',
                position: "absolute"
              }}
              onClick={() => pickCardHandler(card)}
            >
              <Card {...card}/>
            </motion.li>
          );
        })}
      </ul>
    </div>
  )
}

export default SwipeContainer;
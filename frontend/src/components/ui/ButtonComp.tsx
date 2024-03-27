import { Button, TextField } from "@mui/material";
import _ from 'lodash';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectors as cardSelectors } from '../../store/slices/cardSlice';
import { AppDispatch, RootState, actions } from "../../store/store";
import useAuth from "../Auth/hookAuth";
import ModalChange from "../Modals/ModalChange";
import styles from './buttoncomp.module.css';

const ButtonComp = () => {
  const { show, type } = useSelector((state: RootState) => state.modalSlice.modal);
  const currentId = useSelector((state: RootState) => state.cardSlice.currentCardId);
  const {user} = useAuth();
  const cards = useSelector(cardSelectors.selectAll);
  const indexNow = _.findIndex(cards, (card) => card.id === currentId);
  const currCard = cards[indexNow];
  const [income, setIncome] = useState(0);
  const [outcome, setOutcome] = useState(0);

  const dispatch = useDispatch<AppDispatch>();

  const handleOpenModalChange = () => dispatch(actions.openModal({type: "change", target: true }));

  if (!user) {
    return;
  }

  const handleIncome = async () => {
    if (currentId === null) {
      console.log('bad request');
      return;
    }
    const createTransaction = dispatch(actions.createTrans({
      amount: income,
      goal: Number(currCard.balance) + income,
      userId: user.id,
      cardName: currCard.name,
      nameTrans: 'New Income',
      type: 'income',
      userName: user.username,
      cardId: currCard.id,
    }));
    console.log(createTransaction);
    const response = dispatch(actions.changeCard({balance: Number(currCard.balance) + income, id: currentId, userId: user.id}));
    console.log(response);
  }

  const handleOutcome = async () => {
    if (currentId === null) {
      console.log('bad request');
      return;
    }
    const createTranscation = dispatch(actions.createTrans({
      amount: outcome,
      goal: Number(currCard.balance) - income,
      userId: user.id,
      cardName: currCard.name,
      nameTrans: 'New Outcome',
      type: 'outcome',
      userName: user.username,
      cardId: currCard.id,
    }));
    console.log(createTranscation);
    const response = dispatch(actions.changeCard({balance: Number(currCard.balance) - outcome, id: currentId, userId: user.id}));
    console.log(response);
  }

  return(
    <div className={styles.comp}>
      <div className={styles.values}>
        <div className={styles.incomeBox}>
          <TextField onChange={(e) => setIncome(Number(e.target.value))} value={income} required id="outlined-basic" style={{width: '100%'}} label="+ 100" variant="outlined"/>
          <Button onClick={handleIncome} variant="outlined" style={{height: '50px', width: '100%', borderColor: '#21cc4e', color: '#21cc4e', marginTop: '10px'}}>Income</Button>
        </div>
        <div className={styles.outcomeBox}>
          <TextField onChange={(e) => setOutcome(Number(e.target.value))} value={outcome} required id="outlined-basic" style={{width: '100%'}} label="- 200" variant="outlined"/>
          <Button variant="outlined" onClick={handleOutcome} style={{height: '50px', width: '100%', borderColor: '#cc2121', color: '#cc2121', marginTop: '10px'}}>Outcome</Button>
        </div>
      </div>
      <Button onClick={handleOpenModalChange} variant="outlined" style={{width: '100%'}}>Change Data Card</Button>
      <ModalChange show={type === 'change' ? show : false} />
    </div>
  )
}

export default ButtonComp;
import { Button, Modal, Typography } from "@mui/material";
import _ from 'lodash';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectors as cardsSelectors } from '../../store/slices/cardSlice';
import { AppDispatch, RootState, actions } from "../../store/store";
import { ModalAddProps } from "./ModalAdd";
import styles from './modalRemove.module.css';

const ModalRemove: React.FC<ModalAddProps> = ({show}) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentId = useSelector((state: RootState) => state.cardSlice.currentCardId);
  const cards = useSelector(cardsSelectors.selectAll);

  const handleClose = () => dispatch(actions.closeModal({type: 'add', target: null}));

  const onSubmit = async () => {
    try {
      const indexNow = _.findIndex(cards, (card) => card.id === currentId);
      const { id, userId } = cards[indexNow];
      await dispatch(actions.deleteCard({params:{ id, userId }}));
      const nextCard = cards.length - 1 === indexNow ? cards[0] : cards[indexNow + 1];
      dispatch(actions.delete(id));
      dispatch(actions.selectCard(nextCard.id));
      handleClose();
    } catch(error) {
      console.log(error);
    }
  }

  return(
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={styles.modal}
    >
      <div className={styles.box}>
        <Typography>Are u sure delete this?</Typography>
        <Button variant='contained' style={{marginTop: 20}} onClick={onSubmit}>Confirm DELETE</Button>
      </div>
    </Modal>
  )
};

export default ModalRemove;
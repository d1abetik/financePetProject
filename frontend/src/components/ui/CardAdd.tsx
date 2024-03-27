import {
  Button
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, actions } from '../../store/store';
import ModalAdd from '../Modals/ModalAdd';
import styles from './cardAdd.module.css';

const CardAdd = () => {
  const { show, type } = useSelector((state: RootState) => state.modalSlice.modal);

  const dispatch = useDispatch();

  const handleAddModal = () => {
    dispatch(actions.openModal({type: 'add', target: null}));
  }

  return(
    <div>
      <Button onClick={handleAddModal}>
        <div className={styles.card}>
          <svg width="145" height="145" viewBox="0 0 145 145" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M135.232 72.8264H10.2321M72.7321 10.3264V135.326" stroke="blue" stroke-width="18.75" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </Button>
      <ModalAdd show={type === 'add' ? show : false} />
    </div>
  )
}

export default CardAdd;
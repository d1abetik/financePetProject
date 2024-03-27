import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { AppDispatch, actions } from '../../store/store';
import useAuth from '../Auth/hookAuth';
import ColorPicker from '../ui/ColorPicker';
import styles from './modalAdd.module.css';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'RUB',
    label: '₽',
  },
];

interface CheckValues {
  name: string;
  goalNumber: number;
  goalCompleted: number;
  type: string;
  color: string;
}

export interface ModalAddProps {
  show: boolean;
}

const ModalAdd:React.FC<ModalAddProps> = ({ show }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {handleSubmit, control} = useForm<CheckValues>();
  const handleClose = () => dispatch(actions.closeModal({type: 'add', target: null}));
  const ref = useRef();
  const {user} = useAuth();
  const [selectedColor, setColor] = useState<string>("@FFFFFF");

  const handleColorPicker = (color:string) => {
    setColor(color);
  }

  const onSubmit: SubmitHandler<CheckValues> = async (data, event) => {
    event?.preventDefault();
    if (!user) {
      return;
    }

    const sendCard = {
      name: data.name,
      goal: Number(data.goalNumber),
      balance: String(data.goalCompleted),
      userId: user.id,
      type: data.type,
      color: selectedColor
    }
    console.log(sendCard);

    try {
      const res = await dispatch(actions.addCard(sendCard));
      const newCard = res.payload;
      await dispatch(actions.createTrans({
        nameTrans: 'New Card Created',
        amount: 0,
        goal: 0,
        userId: user.id,
        cardName: newCard.name,
        cardId: newCard.id,
        type: 'created',
        userName: user.username,
      }));
      dispatch(actions.selectCard(newCard.id));
      handleClose();
    } catch(error) {
      console.log(error);
    }
  }

  return(
    <div>
      <Modal 
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modal}
      >
        <Box 
          component="form"
          autoComplete='off'
          className={styles.boxModal}
        >
          <form 
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formBox}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2" color={'black'}>
              Create GOAL
            </Typography>
            <Controller 
              name="name"
              control={control}
              render={({field}) => <TextField inputRef={ref} required id="outlined-basic" label="Goal Name" variant="outlined" {...field}/>}
            />
            <div className={styles.goalSet}>
              <Controller 
                name="goalNumber"
                control={control}
                render={({field}) => <TextField inputRef={ref} style={{marginBottom: 20}} required id="outlined-basic" label="Goal Number" variant="outlined" {...field}/>}
              />
              <Controller 
                name="goalCompleted"
                control={control}
                render={({field}) => <TextField inputRef={ref} required id="outlined-basic" label="Goal Completed" variant="outlined"  {...field}/>}
              />
            </div>
            <Controller 
              name="type"
              control={control}
              render={({field}) => <TextField {...field} required id="outlined-select-currency" select defaultValue="RUB" label="Goal Type" helperText="Please select your currency" variant="outlined">
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    {`${option.label} ${option.value}`}
                  </MenuItem>
                ))}
              </TextField>}
            />
            <ColorPicker onChange={handleColorPicker} />
            <Button type='submit' onClick={handleSubmit(onSubmit)} variant='contained'>CREATE</Button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default ModalAdd;
import { Button, Modal, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, actions } from "../../store/store";
import useAuth from "../Auth/hookAuth";
import ColorPicker from "../ui/ColorPicker";
import { ModalAddProps } from "./ModalAdd";
import styles from './modal.module.css';

interface CheckValues {
  id:number;
  userId: number;
  name: string;
  goal: number;
  color: string;
}

const ModalChange = ({show}:ModalAddProps) => {
  const currentId = useSelector((state: RootState) => state.cardSlice.currentCardId);
  const {user} = useAuth();
  const dispatch = useDispatch<AppDispatch>()
  const {handleSubmit, control} = useForm<CheckValues>();
  const [selectedColor, setColor] = useState('');
  const ref = useRef();
  
  const handleClose = () => dispatch(actions.closeModal({type: '', target: null}));

  const handleSendChanges: SubmitHandler<CheckValues> = async (data, event) => {
    event?.preventDefault();
    if (user && currentId) {
      try {
        await dispatch(actions.changeCard({...data, color: selectedColor, id: currentId, userId: user.id}));
        handleClose();
      } catch(error) {
        console.log(error);
      }
    }
  }

  const handleColorPicker = (color:string) => setColor(color);

  return(
    <>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modalChange}
      >
        <div className={styles.boxChange}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color="black">Change card data</Typography>
          <form
            action=""
            onSubmit={handleSubmit(handleSendChanges)}
            className={styles.controllerBox}
          >
            <Controller
              name="name"
              control={control}
              render={({field}) => <TextField autoComplete="off" inputRef={ref} label="Goal Name" {...field} style={{width: 400}} />}
            />
            <Controller
              name="goal"
              control={control}
              render={({field}) => <TextField autoComplete="off" inputRef={ref} label="Goal Number" {...field} style={{marginTop: 20, width: 400}} />}
            />
            <ColorPicker onChange={handleColorPicker} />
            <div className={styles.buttonBox}>
              <Button variant="contained" type="submit" onSubmit={handleSubmit(handleSendChanges)}>Submit</Button>
              <Button variant="outlined" color="error" type="submit" onClick={handleClose}>Cancel</Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default ModalChange;
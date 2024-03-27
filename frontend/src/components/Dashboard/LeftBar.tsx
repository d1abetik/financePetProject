import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, actions } from "../../store/store";
import ModalAdd from "../Modals/ModalAdd";
import ModalRemove from "../Modals/ModalRemove";
import styles from "./leftbar.module.css";

const LeftBar: React.FC = () => {
  const { show, type } = useSelector((state: RootState) => state.modalSlice.modal);

  const dispatch = useDispatch();

  const handleOpenModalAdd = () => {
    dispatch(actions.openModal({type: 'add', target: null}));
  }

  const handleOpenModalRemove = () => {
    dispatch(actions.openModal({type: 'del', target: null}));
  }

  return (
    <nav className={styles.buttons}>
      <Button id="modalAdd" variant="outlined" style={{ width: 200, height: 60 }} onClick={handleOpenModalAdd}>Add Card</Button>
      <ModalAdd show={type === 'add' ? show : false} />
      <Button variant="outlined" style={{ width: 200, height: 60, marginTop: 20 }} onClick={handleOpenModalRemove}>Remove Card</Button>
      <ModalRemove show={type === 'del' ? show : false} />
      <Button variant="outlined" style={{ width: 200, height: 60, marginTop: 20 }}>Send Money</Button>
      <Button variant="outlined" style={{ width: 200, height: 60, marginTop: 20 }}>Coming Income</Button>
      <Button variant="outlined" style={{ width: 200, height: 60, marginTop: 20 }}>Coming Income</Button>
    </nav>
  )
};

export default LeftBar
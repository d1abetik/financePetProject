import { Grid } from "@mui/material";
// import { ICardProps } from "../ui/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectors as cardSelectors } from '../../store/slices/cardSlice';
import { AppDispatch, RootState, actions } from "../../store/store";
import useAuth from "../Auth/hookAuth";
import ButtonComp from "../ui/ButtonComp";
import CardList from "../ui/CardList";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import TopBar from "./TopBar";
import styles from './dashboard.module.css';

const Dashboard: React.FC = () => {
  const {user} = useAuth();

  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          await dispatch(actions.fetchData(user.id));
        } catch(error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, [dispatch, user]);

  const currentCardId = useSelector((state: RootState) => state.cardSlice.currentCardId);
  const cards = useSelector(cardSelectors.selectAll);
  console.log(cards, currentCardId);

  if (!user) {
    return;
  }

  return (
    <main>
      <TopBar />
      <div>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <LeftBar />
          </Grid>
          <Grid
            xs={4}
            columnSpacing={2}
            className={styles.center}
            alignItems='center'
            direction='column'
            container
          >
            <CardList cards={cards} currentCardId={currentCardId} />
            <ButtonComp />
          </Grid>
          <Grid xs={4}>
            <RightBar cards={cards} currentId={currentCardId} />
          </Grid>
        </Grid>
      </div>
    </main>
  )
}

export default Dashboard;
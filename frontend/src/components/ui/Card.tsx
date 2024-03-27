import { LinearProgress, linearProgressClasses } from "@mui/material";
import { styled } from '@mui/material/styles';
import { EntityId } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./card.module.css";

export interface ICardProps {
  id: EntityId;
  color: string;
  name: string;
  balance: string;
  type: string;
  goal: number;
  className?: string;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const Card: React.FC<ICardProps> = ({ name, balance, type, id, goal }) => {
  const currentId = useSelector((state:RootState) => state.cardSlice.currentCardId);

  const MIN = 0;
  const MAX = Number(goal);

  const normalize = (value:number) => ((value - MIN) * 100) / (MAX - MIN);

  return (
    <div className={styles.cardStyle}>
      <div className={styles.textLeft}>{name}</div>
      <div>
        <BorderLinearProgress variant="determinate" color={currentId === id ? 'primary' : 'secondary'} value={normalize(Number(balance))} />
        <div className={styles.txtMain}>
          <span>Balance</span>
          <span>{type}{balance}</span>
        </div>
      </div>
      <div className={styles.blBal}>
        <div>Goal</div>
        <div>{goal}</div>
      </div>
    </div>
  );
}

export default Card;
import React from 'react';
import styles from './transFake.module.css';

const TransactionFakeLoader: React.FC<{count:number}> = ({count}) => {
  const mass: Array<number> = [];
  for (let i = 0; i <= count; i += 1 ) {
    mass.push(i);
  }
  return(
    <>
      {mass.map(() => {
        return(
          <div className={styles.containerFake}>
            <div className={styles.rowFlex}>
              <div className={styles.itemLogo}></div>
              <div className={styles.nameContainer}>
                <div className={styles.itemName}></div>
                <div className={styles.itemName}></div>
              </div>
            </div>
            <div className={styles.buttonsContainer}>
              <div className={styles.fakeBut}>
                <div></div>
              </div>
              <div className={styles.fakeBut}></div>
            </div>
          </div>
        )
      })}
    </>
  );
};

export default TransactionFakeLoader;
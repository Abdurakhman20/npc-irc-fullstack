import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import styles from "./index.module.scss";

const Main = () => {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.mainTitle}>
        <h3>DASHBOARD</h3>
      </div>

      <div className={styles.mainCards}>
        <div className={styles.card}>
          <div className={styles.inner}>
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className={styles.icon} />
          </div>
          <h1>300</h1>
        </div>
        <div className={styles.card}>
          <div className={styles.inner}>
            <h3>Tables</h3>
            <BsFillGrid3X3GapFill className={styles.icon} />
          </div>
          <h1>2</h1>
        </div>
        <div className={styles.card}>
          <div className={styles.inner}>
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className={styles.icon} />
          </div>
          <h1>33</h1>
        </div>
        <div className={styles.card}>
          <div className={styles.inner}>
            <h3>ALERTS</h3>
            <BsFillBellFill className={styles.icon} />
          </div>
          <h1>42</h1>
        </div>
      </div>
    </main>
  );
};

export default Main;
